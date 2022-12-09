import { Schema } from "mongoose";

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  image: String,
  user: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});