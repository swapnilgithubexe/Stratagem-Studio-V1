import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { addLectures, createCourse, deleteCourse, deleteLecture } from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse)

//Lectures
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);

router.delete("/course/:id", isAuth, isAdmin, deleteCourse);

router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);

export default router;