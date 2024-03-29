import { Router } from "express";
import {
  addComment,
  createProject,
  deleteComment,
  editComment,
  getAllProjects,
  getOneProject,
  getProjects,
  voteProject,
} from "../controllers/Project";
import auth from "../middlewares/auth";
import multerUploader from "../helpers/multerUploader";

const projectRouter = Router();

// fetch projects of a user
projectRouter.get("/:userId", getProjects);

projectRouter.get("/", getAllProjects);

// create project
projectRouter.post(
  "/:userID",
  auth,
  multerUploader(
    "thumbnails",
    "thumbnail",
    "image",
    "Kindly select a thumbnail for the project",
    "Only images are allowed as thumbnails"
  ),
  createProject
);

projectRouter.get("/single/:id", getOneProject);

projectRouter.post("/vote/:id", auth, voteProject);

projectRouter.post("/comment/:id", auth, addComment);

projectRouter.delete("/comment/:id", auth, deleteComment);

projectRouter.patch("/comment/:id", auth, editComment);

export default projectRouter;
