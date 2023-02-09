import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  username?: string;
  profilePicture?: string;
  skills?: string[];
}
