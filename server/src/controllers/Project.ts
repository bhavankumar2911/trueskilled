import { RequestHandler } from "express";
import Project from "../models/Project";
import successfulResponse from "../helpers/successfulResponse";
import createHttpError from "http-errors";
import RequestWithMedia from "../interfaces/RequestWithMedia";
import RequestWithUser from "../interfaces/RequestWithUser";
import { Types } from "mongoose";
import User from "../models/User";

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

    if (!project) return next(createHttpError.NotFound("Project not found"));
    // returning user with project
    const user = await User.find({ _id: project.userId }).select("-password");

    return successfulResponse(res, {
      project: { ...project.toJSON(), user: user[0] },
    });
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

  if (!comment) return next(createHttpError.BadRequest("Enter a comment"));

  try {
    const project = await Project.findById(projectId);

    if (!project) return next(createHttpError.NotFound("Project not found"));

    let tempComments = project.comments;

    tempComments.unshift({
      comment: comment,
      userId: userId,
      username: username,
      time: Date.now(),
      projectId,
    });

    // save again in db
    await Project.updateOne(
      { _id: projectId },
      { comments: [...tempComments] }
    );

    return successfulResponse(res, { comments: [...tempComments] });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

const deleteComment: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const { id } = req.params; // project id

  // fetch comment
  try {
    const project = await Project.findById(id);

    if (!project) return next(createHttpError.NotFound("Project not found"));

    const { commentId } = req.body;

    const length = project.comments.length;
    let newComments = [];
    let notAuthorized = false;
    let found = false;

    for (let i = 0; i < length; i += 1) {
      const comment = project.comments[i];

      if (comment._id == commentId) {
        found = true;
        if (comment.userId !== req.userId) {
          notAuthorized = true;
          break;
        }
      } else {
        newComments.push(comment);
      }
    }

    if (!found) return next(createHttpError.NotFound("Comment not found"));
    if (notAuthorized)
      return next(createHttpError.Unauthorized("You're not authorized"));

    return successfulResponse(res, { comments: newComments });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

const editComment: RequestHandler = async (req: RequestWithUser, res, next) => {
  const { id } = req.params; // project id

  try {
    const project = await Project.findById(id);

    if (!project) return next(createHttpError.NotFound("Project not found"));

    const { commentId, comment: newComment } = req.body;

    const length = project.comments.length;
    // let newComments = [];
    let notAuthorized = false;
    let found = false;

    const newComments = project.comments.map((comment) => {
      if (comment._id == commentId) {
        found = true;
        if (comment.userId !== req.userId) {
          notAuthorized = true;
        }

        comment.comment = newComment;

        return comment;
      } else return comment;
    });

    if (!found) return next(createHttpError.NotFound("Comment not found"));
    if (notAuthorized)
      return next(createHttpError.Unauthorized("You're not authorized"));

    return successfulResponse(res, { comments: newComments });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};
