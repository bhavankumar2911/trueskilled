import { RequestHandler } from "express";
import Project from "../models/Project";
import successfulResponse from "../helpers/successfulResponse";
import createHttpError from "http-errors";
import multer from "multer";
import path from "path";
import setupMulter from "../helpers/setupMulter";

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
export const createProject: RequestHandler = async (req, res, next) => {
  // var storage = setupMulter("thumbnails");
  // var upload = multer({
  //   storage: storage,
  //   fileFilter: (req, file, cb) => {
  //     const { isValid, message } = validateFile(
  //       file as Express.Multer.File,
  //       "image"
  //     );
  //     if (!isValid) {
  //       cb(null, false);
  //       return next(createHttpError.BadRequest(message));
  //     }
  //     return cb(null, true);
  //   },
  // }).single("avatar");
  // // uploading file here
  // upload(req, res, async function (err) {
  //   const requestData = req.body;
  //   const { firstName, lastName, username, skills } = requestData;
  //   const userId = req.params.id;
  //   console.log("requestData ----->  ", requestData);
  //   // validation
  //   if (!firstName || !lastName || !username)
  //     return next(createHttpError.BadRequest("All fields are required"));
  //   // check for username
  //   const { doesExit, user } = await checkExistingUser("username", username);
  //   if (doesExit && user && user._id != userId)
  //     return next(createHttpError.Conflict("Username is already taken"));
  //   if (JSON.parse(skills).length == 0)
  //     return next(createHttpError.BadGateway("Add atleast one skill"));
  //   // not changing avatar
  //   if (!req.file) {
  //     const updated = await saveUserInfo(
  //       userId,
  //       firstName,
  //       lastName,
  //       username,
  //       JSON.parse(skills)
  //     );
  //     if (!updated) return next(createHttpError.InternalServerError());
  //     return successfulResponse(res, { message: "Information updated" });
  //   }
  //   // changing avatar
  //   else {
  //     if (err) return next(createHttpError.InternalServerError());
  //     const file = req.file;
  //     // if (!file)
  //     //   return next(createHttpError.BadRequest("Kindle select a file"));
  //     const avatarURL = `${process.env.SERVER_HOST}/public/avatars/${file.filename}`;
  //     // deleting the old avatar of the user
  //     const oldAvatarDeletion = await deleteOldAvatar(userId);
  //     if (oldAvatarDeletion.error)
  //       return next(
  //         createHttpError.InternalServerError(oldAvatarDeletion.message)
  //       );
  //     // saving avatars location in db
  //     const mutationError = await saveAvatarURL(userId, avatarURL);
  //     if (mutationError) {
  //       deleteFile(file.path);
  //       return next(createHttpError.InternalServerError());
  //     }
  //     const updated = await saveUserInfo(
  //       userId,
  //       firstName,
  //       lastName,
  //       username,
  //       JSON.parse(skills)
  //     );
  //     if (!updated) return next(createHttpError.InternalServerError());
  //     return successfulResponse(res, { message: "Information updated" });
  //   }
  // });
};
