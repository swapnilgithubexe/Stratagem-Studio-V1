import trycatchfunction from "../middlewares/trycatch.js";
import { Courses } from "../models/Courses.js"
import { Lecture } from "../models/lecture.js"
import { User } from "../models/user.js";
import { rm } from "fs";
import { promisify } from "util"
import fs from "fs";

export const createCourse = trycatchfunction(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  const image = req.file;

  await Courses.create({
    title, description, category, createdBy, image: image?.path,
    duration, price,
  });

  res.status(201).json({
    message: "Course has been created successfully!"
  })
})

export const addLectures = trycatchfunction(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "No course found!" })
  }

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file.path,
    course: course._id,
  });

  res.status(201).json({ message: "Lecture Added", lecture })
})



export const deleteLecture = trycatchfunction(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found!" });
  }

  // Delete the video file
  rm(lecture.video, (err) => {
    if (err) {
      console.error("Error deleting video:", err);
      return res.status(500).json({ message: "Error deleting video file!" });
    }
    console.log("Video deleted successfully.");
  });

  // Delete the lecture from the database
  await Lecture.findByIdAndDelete(req.params.id);

  res.json({ message: "Lecture deleted successfully!" });
});

//delete course
const unlikeAsync = promisify(fs.unlink)
export const deleteCourse = trycatchfunction(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlikeAsync(lecture.video);
      console.log("Video Deleted Successfully");
    })
  )

  rm(course.image, () => {
    console.log("Thumbnail Deleted");
  })

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne()

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted"
  })
});

export const getAllStats = trycatchfunction(async (req, res) => {

  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;



  const stats = {
    totalCourses, totalLectures, totalUsers
  }

  res.status(200).json({
    stats
  })
})