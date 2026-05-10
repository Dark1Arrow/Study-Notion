// Package
import express from "express"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import cloudinaryConnect from "./config/cloudinary.js"

// Files
import connect_DB from "./config/db.js"
import userRouter from "./routes/user.js"
import profileRouter from "./routes/profile.js"
import courseRouter from "./routes/course.js"
import paymentRoute from "./routes/payment.js"

// Configuration
dotenv.config()
connect_DB()
cloudinaryConnect()

const app = express()

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend
}));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3000

// Routes 

app.use('/api/v1/users', userRouter)
app.use('/api/v1/profile', profileRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/payment",paymentRoute)


app.listen(PORT, () => console.log(`server is running at the port : ${PORT}`))