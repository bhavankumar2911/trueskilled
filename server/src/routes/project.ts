import { Router } from "express";
import { getProjects } from "../controllers/Project";

const projectRouter = Router();

// fetch projects of a user
projectRouter.get("/:userId", getProjects);

export default projectRouter;
