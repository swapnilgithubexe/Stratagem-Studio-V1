import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) return res.status(403).json({
      message: "Login to access this resource."
    });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedToken._id);

    next();


  } catch (error) {
    res.status(500).json({
      message: "Login to access this resource."
    })
  }
}
