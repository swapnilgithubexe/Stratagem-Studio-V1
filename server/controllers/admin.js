import trycatchfunction from "../middlewares/trycatch.js";
import { Courses } from "../models/Courses.js"

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