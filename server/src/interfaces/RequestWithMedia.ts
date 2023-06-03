import { Request } from "express";

export default interface RequestWithMedia extends Request {
  thumbnail?: string;
  userId?: string;
  demoVideo?: string;
}
