import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  bio: String,
  username: String,
  profilePicture: String,
  skills: [String],
});

const User = model("User", userSchema);

export default User;
