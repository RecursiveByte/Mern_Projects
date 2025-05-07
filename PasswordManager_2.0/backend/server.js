import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDd from "./config/db.js";
import authRouter from "./routes/authRoutes.js";


connectDd();

const app = express();

dotenv.config();

app.use(cors({
    origin: "https://passwordmanager-2-0-owpd.onrender.com",
    credentials: true,
   
}));


app.use(express.json());
app.use(cookieParser());
app.use('/', authRouter);

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(3000, () => { console.log("Listening on 3000") });

