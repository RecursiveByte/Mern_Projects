import bcrypt from 'bcryptjs';
import pool from "../config/db.js";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    console.log(title)


    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title query is required' });
    }

    const [rows] = await pool.execute(
      'SELECT id as book_id,author,availability,image_url,title,year FROM books WHERE title LIKE ?',
      [`%${title}%`] 
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching books:', error.message);
    res.status(500).json({ message: 'Server error while searching books' });
  }
};



export const isAuthenticated = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      isAuthenticated: true,
      role: user.role
    });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
};

export const userDetails = async (req,res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute("SELECT id, name, email,role FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      console.warn("User not found");
      res.status(401).json({message:"user not found"})
    }

    res.status(200).json({userData:rows[0]});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
};

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedImages = [];

    for (const file of req.files) {

      file.originalname = file.originalname.split(".")[0];
      file.originalname =  file.originalname.replace(/[^a-zA-Z0-9 ]/g, "").trim();




      console.log(file.originalname);
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'book_images',
        resource_type: 'image',
        use_filename: true,
        unique_filename: false
      });

      const parts = result.public_id.split('/');
      let lastPart = parts[parts.length - 1];

      console.log(lastPart);


      lastPart = lastPart.split('_').join(" ");
      console.log(lastPart);


      await pool.execute(
        `UPDATE books SET image_url = ? WHERE title = ?`,
        [result.secure_url, lastPart]
      );

      uploadedImages.push({
        titleMatched: lastPart,
        url: result.secure_url,
        public_id: result.public_id,
      });

      fs.unlinkSync(file.path);
    }

    return res.status(200).json({
      message: 'Images uploaded and matched successfully',
      images: uploadedImages,
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return res.status(500).json({ message: 'Upload failed', error });
  }
};




export const googleLogin = async (req, res) => {
  const { credentialResponse } = req.body;

  if (!credentialResponse?.credential) {
    return res.status(400).json({ message: "Missing Google credential" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credentialResponse.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    const [existingUser] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    let user;

    if (existingUser.length > 0) {
      user = existingUser[0];
    } else {
      const [insertResult] = await pool.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, '', 'user']
      );
      user = {
        id: insertResult.insertId,
        name,
        email,
        role: 'user'
      };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    console.log(user)

    res.status(200).json({
      message: 'Google login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};



export const finalData = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        books.id AS book_id,
        books.title,
        books.image_url,
        books.author,
        books.year,
        books.availability,
        reviews.id AS review_id,
        reviews.user_id,
        reviews.rating,
        reviews.comment,
        users.name as reviewer_name
      FROM books
      LEFT JOIN reviews ON books.id = reviews.book_id
      LEFT JOIN users ON reviews.user_id = users.id;
    `);


    const groupedBooks = {};

    const [avgRatingsResult] = await pool.execute(`
      SELECT 
        book_id,
        AVG(rating) AS average_rating
      FROM reviews
      GROUP BY book_id
    `);


    const avgRatingsMap = {};
    avgRatingsResult.forEach(({ book_id, average_rating }) => {
      avgRatingsMap[book_id] = average_rating;
    });

    for (let row of rows) {
      const {
        book_id,
        title,
        image_url,
        author,
        year,
        availability,
        review_id,
        user_id,
        rating,
        comment,
        reviewer_name
      } = row;
      console.log(reviewer_name)


      if (!groupedBooks[book_id]) {
        groupedBooks[book_id] = {
          book_id,
          title,
          image_url,
          author,
          year,
          availability,
          avgRatings: avgRatingsMap[book_id] || 0,
          reviews: []
        };
      }

      if (review_id) {
        groupedBooks[book_id].reviews.push({
          id: review_id,
          user_id,
          name: reviewer_name,
          rating,
          comment
        });
      }
    }

    const booksArray = Object.values(groupedBooks);

    res.status(200).json({ books: booksArray });
  } catch (error) {
    console.error('Error fetching books with reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getBooksWithReviews = async (req, res) => {
  try {
    const [result] = await pool.execute(`
      SELECT 
        books.id AS book_id,
        books.title,
        books.author,
        books.year,
        books.availability,
        reviews.id AS review_id,
        reviews.user_id,
        reviews.rating,
        reviews.comment
      FROM books
      LEFT JOIN reviews ON books.id = reviews.book_id
    `);

    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error fetching joined book and review data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getBooksAndReviews = async (req, res) => {
  try {
    const [books] = await pool.execute('SELECT * FROM books');

    const [reviews] = await pool.execute('SELECT * FROM reviews');

    res.status(200).json({
      books,
      reviews
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getAverageRatings = async (req, res) => {
  try {
    const [results] = await pool.execute(`
      SELECT 
        book_id,
        AVG(rating) AS average_rating,
        COUNT(*) AS total_reviews
      FROM reviews
      GROUP BY book_id;
    `);

    res.json({ success: true, data: results });
  } catch (err) {
    console.error('Error fetching average ratings:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const [existingUser] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length)
      return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const finalRole = role === 'admin' || role === 'user' ? role : 'user';

    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, finalRole]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {

  const { email, password, role } = req.body;

  if (!email || !password || !role)
    return res.status(400).json({ message: 'Email, password, and role are required' });

  if (role !== 'admin' && role !== 'user')
    return res.status(400).json({ message: 'Invalid role provided' });

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, role]
    );

    if (!rows.length)
      return res.status(404).json({ message: `No ${role} found with this email` });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });


    res.status(200).json({
      message: `${role} login successful`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict"
    })
    .status(200)
    .json({ message: "Logout successful" });
};



//for Users
export const addReview = async (req, res) => {
  const user_id = req.user?.id;
  console.log(user_id);
  const { book_id, rating, comment } = req.body;


  if (!user_id)
    return res.status(401).json({ message: 'Unauthorized' });

  if (!book_id || !rating)
    return res.status(400).json({ message: 'Book ID and rating are required' });

  if (rating < 1 || rating > 5)
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });

  try {
    const [result] = await pool.execute(
      'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, book_id, rating, comment || null]
    );

    res.status(201).json({
      message: 'Review added successfully',
      reviewId: result.insertId
    });
  } catch (err) {
    console.error('Add Review Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const editReview = async (req, res) => {
  const user_id = req.user?.id;
  const { review_id, rating, comment } = req.body;

  if (!user_id)
    return res.status(401).json({ message: 'Unauthorized' });

  if (!review_id)
    return res.status(400).json({ message: 'Review ID is required' });

  if (rating && (rating < 1 || rating > 5))
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });

  try {
    const [existingReview] = await pool.execute(
      'SELECT * FROM reviews WHERE id = ? AND user_id = ?',
      [review_id, user_id]
    );

    if (!existingReview.length)
      return res.status(404).json({ message: 'Review not found or not yours to edit' });

    await pool.execute(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating || existingReview[0].rating, comment || existingReview[0].comment, review_id]
    );

    res.status(200).json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Edit Review Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  console.log("this ",req.body)
  const user_id = req.user?.id;
  const { review_id } = req.body;


  if (!user_id)
    return res.status(401).json({ message: 'Unauthorized' });

  if (!review_id)
    return res.status(400).json({ message: 'Review ID is required' });

  try {
    const [existingReview] = await pool.execute(
      'SELECT * FROM reviews WHERE id = ?',
      [review_id]
    );

    if (!existingReview.length)
      return res.status(404).json({ message: 'Review not found' });

    if (existingReview[0].user_id !== user_id)
      return res.status(403).json({ message: 'You are not allowed to delete this review' });

    await pool.execute(
      'DELETE FROM reviews WHERE id = ?',
      [review_id]
    );

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Delete Review Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


//for admin
export const editBook = async (req, res) => {
  const user_id = req.user?.id;
  const user_role = req.user?.role;
  const { book_id, title, author, year, availability } = req.body;

  if (!user_id || user_role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can edit books' });
  }

  if (!book_id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  try {
    const [existingBook] = await pool.execute(
      'SELECT * FROM books WHERE id = ?',
      [book_id]
    );

    if (!existingBook.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await pool.execute(
      `UPDATE books 
       SET title = ?, author = ?, year = ?, availability = ?
       WHERE id = ?`,
      [
        title || existingBook[0].title,
        author || existingBook[0].author,
        year || existingBook[0].year,
        typeof availability === 'boolean' ? availability : existingBook[0].availability,
        book_id
      ]
    );

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Edit Book Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const addBooksFromCSV = async (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const books = req.body; 


  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty book list' });
  }

  try {
    const insertPromises = books.map((book) => {
      let { title, author, year, availability } = book;

      if (!title || !author || !year) return null;
      
      title = title.replace(/[^a-zA-Z0-9 ]/g, "").trim();

      const available =
        availability !== undefined
          ? availability.toString().toLowerCase() === 'true' ||
            availability.toString() === '1'
          : true; 

      return pool.execute(
        'INSERT INTO books (title, author, year, availability) VALUES (?, ?, ?, ?)',
        [title, author, year, available]
      );
    });

    // Filter out any nulls (invalid entries)
    const validInserts = insertPromises.filter(Boolean);

    await Promise.all(validInserts);

    res.status(201).json({
      message: `Successfully added ${validInserts.length} book(s)`,
    });
  } catch (err) {
    console.error('CSV Upload Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const deleteBook = async (req, res) => {
  const { book_id } = req.body;



  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can delete books' });
  }

  if (!book_id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  try {
    const [existing] = await pool.execute('SELECT * FROM books WHERE id = ?', [book_id]);

    if (!existing.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await pool.execute('DELETE FROM books WHERE id = ?', [book_id]);

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};










