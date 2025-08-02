import express from 'express';
import {deleteBook,userDetails,isAuthenticated,logoutUser, uploadImages,finalData,getBooksWithReviews, googleLogin,getBooksAndReviews,getAverageRatings, register,login,addReview,editReview,deleteReview, editBook, addBooksFromCSV, searchBooksByTitle} from '../controller/authController.js';
import { authenticateUser } from '../middlewares/userAuthMiddleWare.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/getBooksAndReviews', getBooksAndReviews);
router.get('/getBooksWithReviews', getBooksWithReviews);
router.get('/average-ratings', getAverageRatings);
router.get('/finalData', finalData);
router.get('/searchBooksByTitle', searchBooksByTitle);



router.post('/userDetails', authenticateUser, userDetails );

router.post('/register', register);
router.post('/login', login);
router.post('/googleLogin', googleLogin);
router.post('/logout', logoutUser );
router.post('/isAuth', authenticateUser, isAuthenticated );

router.post('/uploadImages',authenticateUser,upload.array('images'),uploadImages);

router.post('/addReview',authenticateUser , addReview);
router.patch('/editReview',authenticateUser , editReview);
router.delete('/deleteReview',authenticateUser , deleteReview);

router.post('/addBook',authenticateUser , addBooksFromCSV);
router.patch('/editBook',authenticateUser , editBook);
router.delete('/deleteBook',authenticateUser , deleteBook);

export default router;
