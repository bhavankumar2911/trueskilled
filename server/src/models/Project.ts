import mongoose, { model, Schema } from "mongoose";

const projectSchema = new Schema({
  userId: String,
  thumbnail: String,
  title: String,
  tags: [String],
  upvotes: Number,
  comments: [String],
  about: String,
  video: String,
});

const Project = model("Project", projectSchema);

export default Project;
