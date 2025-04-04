import express from "express";

import { registerUser } from "../controller/User.controller.js";

const router = express.Router()

router.get("/register", registerUser)

export default router;