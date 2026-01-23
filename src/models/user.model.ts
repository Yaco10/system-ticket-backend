import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    lastname: { type: String },
    city: { type: String },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);


export const User = model("User", userSchema);
