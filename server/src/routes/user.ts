import { Router } from "express";
import { fetchUserProfile } from "../controllers/User";
import auth from "../middlewares/auth";

const authRouter = Router();

// fetch user profile
authRouter.get("/profile", auth, fetchUserProfile);

export default authRouter;
