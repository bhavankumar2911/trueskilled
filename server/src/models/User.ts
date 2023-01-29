import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  bio: String,
  username: String,
  profilePicture: String,
  skills: [Types.ObjectId],
});

const User = model("User", userSchema);

export default User;
