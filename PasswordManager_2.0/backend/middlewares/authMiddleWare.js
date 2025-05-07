import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) =>{
    
    const token = req.cookies.token1;

    if(!token)
        return res.json({success:false ,message:"unauthorized"});

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.userId = decoded.id;


    next();
}

export default authMiddleware;