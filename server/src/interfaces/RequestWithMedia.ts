import { Request } from "express";

export default interface RequestWithMedia extends Request {
  thumbnailURL?: string;
  userId?: string;
  videoURL?: string;
}
