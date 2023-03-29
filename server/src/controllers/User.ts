import { RequestHandler } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import RequestWithUser from "../interfaces/RequestWithUser";
import Project from "../models/Project";
import User from "../models/User";

export const fetchUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select(
      "_id firstName lastName email bio username profilePicture skills"
    );

    if (!user) return next(createHttpError.NotFound("User not found"));

    const projects = await Project.find({ userId: user._id });

    return successfulResponse(res, { user: { ...user.toJSON(), projects } });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};

export const fetchUserProfile: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select(
      "_id firstName lastName email bio username profilePicture skills"
    );

    if (!user) return next(createHttpError.NotFound("User not found"));

    const projects = await Project.find({ userId: user._id });

    return successfulResponse(res, { user: { ...user.toJSON(), projects } });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};
