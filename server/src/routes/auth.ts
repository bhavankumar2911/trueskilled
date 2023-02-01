import { Router } from "express";
import { completeProfile, signup } from "../controllers/Auth";

const authRouter = Router();

// register/signup
authRouter.post("/signup", signup);

// complete profile
authRouter.post("/complete-profile", completeProfile);

export default authRouter;
