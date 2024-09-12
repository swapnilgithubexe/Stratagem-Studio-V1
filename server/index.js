import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

//Middlewares
app.use(express.json());

// Route to check if the server is running
app.get("/", (req, res) => {
  res.send("<h3> Server is working </h3>");
});

// Handling Routes
import userRoutes from "./routes/user.js";

// Using Routes
app.use("/api/v1", userRoutes);

// Fallback port in case process.env.PORT is undefined
const PORT = process.env.PORT || 5000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);

  // Connecting to the database
  connectDb();
});
