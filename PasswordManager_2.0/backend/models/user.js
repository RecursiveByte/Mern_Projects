import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otpVerification: {
        type: String,
        default: ""
    },
    otpExpriedTime: {
        type: Number,
        default: 0
    },
    resetOtp: {
        type: String,
        default: ""
    },
    resetOtpExpiresAt: {
        type: Number,
        default: 0
    }

});

const user = mongoose.model('user',userSchema) 

export default user;