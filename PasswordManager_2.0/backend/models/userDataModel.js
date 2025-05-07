import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        passwordRef: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    
    
);

const userData = mongoose.model("userData", userDataSchema);
export default userData;