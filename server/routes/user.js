import express from "express";
import { confirmUser, register } from "../controllers/user.js";

const router = express.Router();

//Routes
router.get("/user/register", register);

router.post("/user/register", register);
router.post("/user/confirm", confirmUser);


export default router;