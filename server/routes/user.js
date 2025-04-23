import express from "express";
import { confirmUser, login, myProfile, register } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

//Routes
router.get("/user/register", register);

router.post("/user/register", register);
router.post("/user/verify", confirmUser);
router.post("/user/login", login);
router.get("/user/me", isAuth, myProfile);


export default router;