import mongoose, { model, Schema } from "mongoose";

const projectSchema = new Schema({
  title: String,
  description: String,
  thumbnail: String,
  tags: [String],
  repositoryLink: String,
  previewLink: String,
  video: String,
  userId: String,
  upvotes: [String],
  comments: [
    {
      comment: String,
      username: String,
      userId: String,
      time: Number,
      projectId: String,
      _id: mongoose.Types.ObjectId,
    },
  ],
});

const Project = model("Project", projectSchema);

export default Project;
