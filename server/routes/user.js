import express from "express";
import { register } from "../controllers/user.js";

const router = express.Router();

//Routes
router.get("/user/register", register);

router.post("/user/register", register);


export default router;