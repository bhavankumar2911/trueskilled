import { Router } from "express";
import {
  fetchUser,
  fetchUserProfile,
  updateUserAbout,
  updateUserInfo,
} from "../controllers/User";
import auth from "../middlewares/auth";

const authRouter = Router();

// fetch user profile
authRouter.get("/profile", auth, fetchUserProfile);

// update user info
authRouter.patch("/info/:id", auth, updateUserInfo);

// update about
authRouter.patch("/about/:id", auth, updateUserAbout);

authRouter.get("/:id", fetchUser);

export default authRouter;
