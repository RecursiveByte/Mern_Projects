import user from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../config/nodemailer.js"
import userData from "../models/userDataModel.js";
import crypto from "crypto";


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.json({ success: false, message: "missing inputs" });

    const isUser = await user.findOne({ email });

    if (isUser)
        return res.json({ success: false, message: "user already exists" });


    const hashPass = await bcrypt.hash(password, 5);

    const newUser = new user({ name, email, password: hashPass })
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.cookie("token1", token,
        {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax"
        }
    )


    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to the Password Manager",
        text: `Thankyou for registering .Your account has been created with email: ${email}`
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: "new user added" })
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.json({ success: false, message: "missing inputs" });

    const isUser = await user.findOne({ email });

    if (isUser) {
        const isMatch = await bcrypt.compare(password, isUser.password)


        if (isMatch) {


            const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.cookie("token1", token,
                {
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                     domain: '.onrender.com',
                     path: '/'
                }
            );
            console.log(res.cookie);
            return res.json({ success: true, message: "valid user" })
        }


    }
    else
        return res.json({ success: false, message: "not a user" })


    res.json({ success: false, message: "wrong password" })
}

export const logout = (req, res) => {
    res.clearCookie("token1", {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax"
    });

    res.clearCookie("token2", {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax"
    });

    res.json({ success: true, message: "logout successfully" });
}

export const sendOtp = async (req, res) => {

    const userId = req.userId;

    try {

        const userData = await user.findOne({ _id: userId });

        if (userData.isVerified)
            return res.json({ success: false, message: "User already verified" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        userData.otpVerification = otp;
        userData.otpExpriedTime = Date.now() +  24 * 60 * 60 * 1000;
        await userData.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Account verification process",
            text: `this is your otp for verification ${otp}`
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "otp sent successfully" });

    } catch (error) {
        res.json({ succes: false, message: error.message })
    }

}


export const verifyOtp = async (req, res) => {

    const { otp } = req.body;
    const userId = req.userId;

    try {

        const userData = await user.findOne({ _id: userId });

        if (userData.otpVerification === "" || userData.otpVerification !== otp)
            return res.json({ success: false, message: "invalid otp" });

        if (userData.otpExpriedTime < Date.now())
            return res.json({ succes: false, message: "otp expired" })

        userData.isVerified = true;

        userData.otpVerification = "";
        userData.otpVerification = 0;

        await userData.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Account Verified",
            text: `Your Account ${userData.email} has been verified successfully`,
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "verification completed " })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const isAuthenticated = async (req, res) => {

    try {
        res.json({ success: true })
    }
    catch (err) {
        res.json({ success: false, message: err.message });
    }
}

export const sendOtpPasswordReset = async (req, res) => {

    const { email } = req.body;

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token2", token,
        {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax"
        }
    )

    if (!email)
        res.json({ success: false, message: "no email " })

    try {

        const userData = await user.findOne({ email });

        const otp = Math.floor(100000 + Math.random() * 900000);

        userData.resetOtp = otp;
        userData.resetOtpExpiresAt = Date.now() * 15 * 60 * 1000;
        await userData.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "password reset otp",
            text: `this is your otp for resettting the password ${otp}`
        }

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "otp for password reset has been sent" })
    } catch (error) {
        res.json({ succes: false, message: error.message })
    }
}

export const getOtp = async (req, res) => {

    const { otp } = req.body;
    const email = req.email;

    if (!otp)
        return res.json({ success: false, message: "please enter the otp" })

    try {

        const userData = await user.findOne({ email });

        if (!userData)
            return res.json({ success: false, message: "user not found" })

        if (userData.resetOtp === "" || userData.resetOtp !== otp)
            return res.json({ success: false, message: "invalid otp" })

        if (userData.resetOtpExpiresAt < Date.now())
            return res.json({ success: false, message: "otp expired" })

        res.json({ success: true, message: "otp verified successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const changePassword = async (req, res) => {

    const { password, reEnterPass } = req.body;
    const email = req.email;

    console.log("this ", password, reEnterPass)
    if (!password || !reEnterPass)
        return res.json({ success: false, message: "please enter some data" })

    try {

        const userData = await user.findOne({ email });
        if (!userData)
            return res.json({ success: false, message: "user not found" })

        console.log(userData);
        if (password !== reEnterPass)
            return res.json({ success: false, message: "passwords do not match" })

        const hashPass = await bcrypt.hash(password, 5);

        userData.password = hashPass;
        userData.resetOtp = "";
        userData.resetOtpExpiresAt = 0;

        await userData.save();

        res.json({ success: true, message: "password has been reset successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export const getData = async (req, res) => {

    const userId = req.userId;

    console.log(userId)

    try {
        const userData = await user.findOne({ _id: userId });
        if (!userData)
            return res.json({ success: false, message: "user not found" })

        res.json({ success: true, data: userData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

function encrypt(text) {


    const algorithm = "aes-256-cbc";
    const secret_key = Buffer.from(process.env.SECRET_KEY, "hex");
    const iv = Buffer.from(process.env.IV, "hex");

    const cipher = crypto.createCipheriv(algorithm, secret_key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString("hex");
}

function decrypt(text) {
    const algorithm = "aes-256-cbc";
    const secret_key = Buffer.from(process.env.SECRET_KEY, "hex");
    const iv = Buffer.from(process.env.IV, "hex");

    const decipher = crypto.createDecipheriv(algorithm, secret_key, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(text, "hex")), decipher.final()]);
    return decrypted.toString();
}


export const saveUserData = async (req, res) => {

    const { passwordRef, password } = req.body;
    const userId = req.userId;

    
    
    if (!passwordRef || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const encryptedPassword = encrypt(password);

    try {
        const newData = new userData({
            userId,
            passwordRef,
            password:encryptedPassword,
        });

        await newData.save();

        res.status(201).json({ success: true, message: "User data saved successfully." });
    } catch (error) {
        console.error("Error saving user data:", error.message);
        res.status(500).json({ success: false, message: "Server error. Could not save user data." });
    }
};


export const getUserData = async (req, res) => {
    try {

        const data = await userData.find({ userId: req.userId }).lean();

        data.forEach((item) => {
              item.password = decrypt(item.password);
        
          });
        
        res.status(200).json({ success: true, data:data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch data." });
    }
};


export const deleteUserData = async (req, res) => {
    const { _id } = req.body;

    try {
        await userData.deleteOne({ _id: _id });
        res.status(200).json({ success: true, message: "User data deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete user data." });
    }
};

export const updateUserData = async (req, res) => {

    const { _id, passwordRef, password } = req.body;

    console.log("id", _id, passwordRef, password)

    try {
        if (!_id || !passwordRef || !password)
            return res.status(400).json({ success: false, message: "All fields are required." });

        const encryptedPassword = encrypt(password);

        const updatedData = await userData.updateOne({ _id: _id }, { $set: { passwordRef: passwordRef, password: encryptedPassword } });

        if (updatedData.matchedCount === 0)
            return res.status(404).json({ success: false, message: "User data not found." });

        res.status(200).json({ success: true, message: "User data updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error. Could not update user data." });
    }
}





