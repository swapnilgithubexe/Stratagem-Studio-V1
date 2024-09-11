import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("<h3> Server is working </h3>")
})

//Handling Routes
import userRoutes from "./routes/user.js";

//Using Routes
app.use("/api/v1", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port number ${process.env.PORT}`);
  connectDb()

})