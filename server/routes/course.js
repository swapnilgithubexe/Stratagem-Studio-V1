import express from "express";
import { fetchLecture, fetchLectures, getAllCourses, getSingleCourse } from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js"

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);

router.get("/lectures/:id", isAuth, fetchLectures)
router.get("/lecture/:id", isAuth, fetchLecture)

export default router;