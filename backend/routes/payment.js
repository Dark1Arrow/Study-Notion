import express from "express"
const router = express.Router();

import {capturePayment,verifyPayment,sendPaymentSuccessEmail} from "../controllers/payments.js"
import { auth,isAdmin,isInstructor,isStudent } from '../middlewares/auth.js';

router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifyPayment', auth, isStudent, verifyPayment);
router.post('/sendPaymentSuccessEmail', auth, isStudent, sendPaymentSuccessEmail);

export default router