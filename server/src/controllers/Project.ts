import { RequestHandler } from "express";
import Project from "../models/Project";
import successfulResponse from "../helpers/successfulResponse";
import createHttpError from "http-errors";
import multer from "multer";
import path from "path";
import setupMulter from "../helpers/setupMulter";
import RequestWithMedia from "../interfaces/RequestWithMedia";

export const getProjects: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const projects = await Project.find({ userId });

    return successfulResponse(res, { projects });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

// add new project
export const createProject: RequestHandler = async (
  req: RequestWithMedia,
  res,
  next
) => {
  let { title, description, repositoryLink, previewLink, tags } = req.body;

  console.log({ title, description, repositoryLink, previewLink, tags });

  // validation
  if (!title || !description)
    return next(createHttpError.BadRequest("Title and Description is needed"));

  if (!repositoryLink && !previewLink)
    return next(
      createHttpError.BadRequest(
        "Either repository link or preview link is required"
      )
    );

  tags = JSON.parse(tags);

  Project.create({
    title,
    description,
    thumbnail: req.thumbnailURL,
    repositoryLink,
    previewLink,
    tags,
    video: req.videoURL,
    userId: req.userId,
    upvotes: 0,
    comments: [],
  })
    .then((response) => successfulResponse(res, { message: "Project created" }))
    .catch((error) => next(createHttpError.InternalServerError()));

  return;
};
