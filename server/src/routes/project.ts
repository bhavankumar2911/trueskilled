import { Router } from "express";
import { createProject, getProjects } from "../controllers/Project";
import auth from "../middlewares/auth";
import multerUploader from "../helpers/multerUploader";

const projectRouter = Router();

// fetch projects of a user
projectRouter.get("/:userId", getProjects);

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

export default projectRouter;
