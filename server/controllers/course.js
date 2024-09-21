import trycatchfunction from "../middlewares/trycatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";


export const getAllCourses = trycatchfunction(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  })
});

export const getSingleCourse = trycatchfunction(async (req, res) => {
  const course = await Courses.findById(req.params.id)

  res.json({
    course
  })
});

export const fetchLectures = trycatchfunction(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id)

  if (user.role === "admin") {
    return res.json({ lectures })
  }

  if (!user.subscription.includes(req.params.id)) return res.status(400).json({
    message: "You have not subscribed to this course!"
  });

  res.json({
    lectures
  })
})