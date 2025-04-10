import express from "express";
import { 
    login, 
    registerUser, 
    VerifyUser , 
    getMe , 
    logoutUser , 
    forgotPassword ,
    resetPassword
} from "../controller/User.controller.js";

import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/register", registerUser);
router.get("/verify/:token", VerifyUser);
router.post("/login", login);
router.get("/profile", isLoggedIn, getMe)
router.get("/logout",isLoggedIn, logoutUser)

export default router;