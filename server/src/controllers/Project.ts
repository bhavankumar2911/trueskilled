import { RequestHandler } from "express";
import Project from "../models/Project";
import successfulResponse from "../helpers/successfulResponse";
import createHttpError from "http-errors";
import RequestWithMedia from "../interfaces/RequestWithMedia";
import RequestWithUser from "../interfaces/RequestWithUser";
import { Types } from "mongoose";

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
    thumbnail: req.thumbnail,
    repositoryLink,
    previewLink,
    tags,
    video: null,
    userId: req.userId,
    upvotes: [],
    comments: [],
  })
    .then((response) =>
      successfulResponse(res, { message: "Project created", project: response })
    )
    .catch((error) => next(createHttpError.InternalServerError()));

  return;
};

export const getOneProject: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({ _id: id });
    return successfulResponse(res, { project });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

export const voteProject: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) return next(createHttpError.NotFound("Project not found"));

    const newVoteList = project.upvotes.filter((user) => user !== username);

    if (newVoteList.length == project.upvotes.length) {
      newVoteList.push(username);
    }

    await Project.findByIdAndUpdate(id, { upvotes: newVoteList });
    return successfulResponse(res, { upvotes: newVoteList });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

export const addComment: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const { id: projectId } = req.params;
  const { userId } = req;
  const { comment, username } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) return next(createHttpError.NotFound("Project not found"));

    project.comments.push({
      comment: comment,
      userId: userId,
      username: username,
      time: Date.now(),
    });

    return successfulResponse(res, { comments: project.comments });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};
