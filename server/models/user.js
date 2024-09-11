import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    requiredL: true,
  },
  role: {
    type: String,
    default: "user",
  },
  subscription: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
}, {
  timestamps: true
})

export const User = mongoose.model("User", schema)