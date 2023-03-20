import { Router } from "express";
import { fetchUserProfile } from "../controllers/User";

const authRouter = Router();

// fetch user profile
authRouter.post("/profile", fetchUserProfile);

export default authRouter;
