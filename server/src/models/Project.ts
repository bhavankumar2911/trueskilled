import mongoose, { model, Schema } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  thumbnail: String,
  tags: [String],
  repoLink: String,
  previewLink: String,
  video: String,
  userId: String,
  upvotes: Number,
  comments: [String],
});

const Project = model("Project", projectSchema);

export default Project;
