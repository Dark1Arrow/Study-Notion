import Rajorpay from "razorpay"
import dotenv from "dotenv"
dotenv.config()

const instance = new Rajorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})
console.log("hgvb ",instance)

export {instance}