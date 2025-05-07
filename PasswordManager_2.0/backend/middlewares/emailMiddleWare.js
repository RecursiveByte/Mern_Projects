import jwt from "jsonwebtoken";
import user from "../models/user.js";

const authMiddleware = async (req,res,next) =>{
    
    const token = req.cookies.token2;
    
    
    if(!token)
        return res.json({success:false ,message:"unauthorized"});

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.email = decoded.email;

    next();
}

export default authMiddleware;