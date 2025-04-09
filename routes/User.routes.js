import express from "express";

import { login, registerUser, VerifyUser } from "../controller/User.controller.js";

const router = express.Router()

router.post("/register", registerUser);

router.get("/verify/:token", VerifyUser);

router.post("/login", login);

export default router;