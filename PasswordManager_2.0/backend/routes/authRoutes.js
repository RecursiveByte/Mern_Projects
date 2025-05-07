import express from "express";
import { changePassword, isAuthenticated, login, logout, register, sendOtp, sendOtpPasswordReset, verifyOtp,getData, getOtp, saveUserData,getUserData,deleteUserData,updateUserData } from "../controller/authController.js";
import authMiddleware from "../middlewares/authMiddleWare.js";
import emailMiddleware from "../middlewares/emailMiddleWare.js";

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/sendOtp",authMiddleware,sendOtp);
authRouter.post("/verifyOtp",authMiddleware,verifyOtp);
authRouter.post("/isAuthenticated",authMiddleware,isAuthenticated);
authRouter.post("/sendOtpPasswordReset",sendOtpPasswordReset);
authRouter.post("/changePassword",emailMiddleware,changePassword);
authRouter.post("/getOtp",emailMiddleware,getOtp);
authRouter.get("/getData",authMiddleware,getData);
authRouter.post("/insertData",authMiddleware,saveUserData);
authRouter.get("/userdata", authMiddleware, getUserData); 
authRouter.post("/delete", authMiddleware, deleteUserData); 
authRouter.post("/update", authMiddleware, updateUserData); 

export default authRouter;