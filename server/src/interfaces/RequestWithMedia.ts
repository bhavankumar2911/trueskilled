import { Request } from "express";

export default interface RequestWithMedia extends Request {
  thumbnailURL?: string;
  videoURL?: string;
}
