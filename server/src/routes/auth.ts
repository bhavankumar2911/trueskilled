import { Router } from "express";
import { signup } from "../controllers/Auth";

const authRouter = Router();

// register/signup
authRouter.post("/signup", signup);

export default authRouter;
