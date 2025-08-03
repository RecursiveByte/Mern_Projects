# BookVerse 📚

A modern, full-stack book review platform where readers can discover, review, and discuss their favorite books. Built with a focus on user experience and community engagement.


[📖 Try BookVerse Live](https://bookverse-r904.onrender.com)

## ✨ Features

- **User Authentication**: Secure user registration and login system
- **Book Reviews**: Write detailed reviews with ratings for any book
- **Personal Management**: Edit and delete your own reviews
- **Book Discovery**: Browse and search through book collections
- **Responsive Design**: Beautiful, mobile-first interface
- **Community Driven**: Read reviews from other book enthusiasts

## 🛠️ Tech Stack

**Frontend:**
- React.js - Modern JavaScript library for building user interfaces
- Tailwind CSS - Utility-first CSS framework for rapid UI development

**Backend:**
- Node.js - JavaScript runtime environment
- Express.js - Fast, unopinionated web framework
- MySQL Cloud - Reliable cloud database solution

**Authentication:**
- JWT (JSON Web Tokens) for secure user sessions
- Bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MySQL database access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bookverse.git
   cd bookverse
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=bookverse
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Database Setup**
   ```bash
   # Run database migrations (if using a migration tool)
   npm run migrate
   
   # Or import the provided SQL schema
   mysql -u username -p bookverse < database/schema.sql
   ```

6. **Start the application**
   
   Backend server:
   ```bash
   cd backend
   npm start
   ```
   
   Frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
bookverse/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.js
│   └── public/
├── database/
│   └── schema.sql
└── README.md
```

## 🔐 Authentication & Authorization

- Users must register and login to write reviews
- JWT tokens are used for session management
- Users can only edit/delete their own reviews
- Protected routes ensure secure access to user-specific features

## 🌟 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get specific book details
- `POST /api/books` - Add new book (authenticated)

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/book/:bookId` - Get reviews for specific book
- `POST /api/reviews` - Create new review (authenticated)
- `PUT /api/reviews/:id` - Update review (author only)
- `DELETE /api/reviews/:id` - Delete review (author only)

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

## 🎨 UI Components

Built with Tailwind CSS for a modern, responsive design:
- Clean and intuitive navigation
- Responsive book cards and review layouts
- Beautiful forms 
- Mobile-optimized interface


## 🚀 Deployment

### Production Setup

1. **Environment Variables**: Update your `.env` file with production values
2. **Database**: Ensure your MySQL cloud database is properly configured
3. **Build Frontend**: `npm run build` in the frontend directory
4. **Deploy**: Deploy to your preferred hosting platform (Heroku, Vercel, DigitalOcean, etc.)

### Recommended Hosting Platforms
- **Frontend**: Render
- **Backend**: Render
- **Database**: freesqdb

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 📞 Support

If you encounter any issues or have questions:
- Email on opboy4885@gmail.com

## 🙏 Acknowledgments
- Built with modern web technologies for the best user experience

---

**Happy Reading! 📖✨**
