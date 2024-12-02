import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "Razorpay";

// Load environment variables from .env file
dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

//Middlewares
app.use(express.json());

// Route to check if the server is running
app.get("/", (req, res) => {
  res.send("<h3> Server is working </h3>");
});

app.use("/uploads", express.static("uploads"))

// Handling Routes
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";

// Using Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", adminRoutes);


// Fallback port in case process.env.PORT is undefined
const PORT = process.env.PORT || 5000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);

  // Connecting to the database
  connectDb();
});
