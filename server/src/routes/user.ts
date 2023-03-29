import { Router } from "express";
import { fetchUser, fetchUserProfile } from "../controllers/User";
import auth from "../middlewares/auth";

const authRouter = Router();

// fetch user profile
authRouter.get("/profile", auth, fetchUserProfile);
authRouter.get("/:id", fetchUser);

export default authRouter;
