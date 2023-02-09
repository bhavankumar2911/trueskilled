import { Router } from "express";
import {
  completeProfile,
  login,
  signup,
  uploadAvatar,
} from "../controllers/Auth";

const authRouter = Router();

// register/signup
authRouter.post("/signup", signup);

// complete profile
authRouter.post("/complete-profile/:id", completeProfile);

// upload avatar
authRouter.post("/upload-avatar/:id", uploadAvatar);

// login user
authRouter.post("/login", login);

export default authRouter;
