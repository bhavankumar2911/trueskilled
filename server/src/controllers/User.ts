import { RequestHandler } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import RequestWithUser from "../interfaces/RequestWithUser";
import User from "../models/User";

export const fetchUserProfile: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const { userId } = req;

  try {
    console.log(userId);

    const user = await User.findById(userId).select(
      "_id firstname lastname email bio username profilePicture skills"
    );

    if (!user) return next(createHttpError.NotFound("User not found"));

    return successfulResponse(res, { user });
  } catch (error) {
    console.log(error);

    return next(createHttpError.InternalServerError());
  }
};
