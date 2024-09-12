import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import trycatchfunction from "../middlewares/trycatch.js";

export const register = trycatchfunction(async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashedPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    { expiresIn: "5m" }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "StrataGem Studios Password Recovery Email", data);

  res
    .status(200)
    .json({ message: "OTP sent to the Email address", activationToken });
});

//To verify the user;
export const confirmUser = trycatchfunction(async (req, res) => {
  const { otp, activationToken } = req.body;

  const tokenCheck = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!tokenCheck) return res.status(400).json({
    message: "Oops, looks like this OTP is expired! Please try again."
  });

  if (tokenCheck.otp !== otp) return res.status(400).json({ message: "Invalid OTP!" })

  await User.create({
    name: tokenCheck.user.name,
    email: tokenCheck.user.email,
    password: tokenCheck.user.password,
  });

  res.json({
    message: "User Registered."
  })
});