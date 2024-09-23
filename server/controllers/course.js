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
});

export const fetchLecture = trycatchfunction(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id); // Fetch course by lectureId

  const user = await User.findById(req.user.id);  // Fetch user by user ID


  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(req.params.lectureId)) {
    return res.status(400).json({
      message: "Please subscribe to view this lecture!"
    });
  }

  res.json({ lecture });
});
