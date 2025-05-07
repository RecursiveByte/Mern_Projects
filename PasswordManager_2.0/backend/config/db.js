import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

async function connectDd()
{

    try {
        const conn =await mongoose.connect(process.env.MONGO_URI);
        console.log("connected")
    } catch (error) {
            console.log("not connected ",error)
    }
}


export default connectDd;