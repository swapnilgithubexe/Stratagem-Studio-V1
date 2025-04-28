import trycatchfunction from "../middlewares/trycatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import { instance } from "../index.js"
import crypto from 'crypto';
import { Payment } from "../models/payment.js"


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

export const getMyCourses = trycatchfunction(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.status(200).json({ courses });
});

export const checkout = trycatchfunction(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id)

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "Oops! You have this course already."
    })

  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  }

  const order = await instance.orders.create(options);

  res.status(200).json({
    order, course
  });
});

export const paymentVerification = trycatchfunction(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_Secret).update(body).digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id, razorpay_payment_id, razorpay_signature
    });

    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);

    await user.save()

    res.status(200).json({
      message: "Course purchased successful!"
    })


  } else {
    return res.status(400).json({
      message: "Payment Failed"
    })
  }
});
