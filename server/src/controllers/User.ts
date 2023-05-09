import { RequestHandler, request } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import RequestWithUser from "../interfaces/RequestWithUser";
import Project from "../models/Project";
import User from "../models/User";
import multer from "multer";
import path from "path";
import validateFile from "../helpers/validateFile";
import deleteOldAvatar from "../services/auth/deleteOldAvatar";
import saveAvatarURL from "../services/auth/saveAvatarURL";
import deleteFile from "../helpers/deleteFile";
import { checkExistingUser } from "../services/auth/checkExistingUser";
import saveUserInfo from "../services/user/saveUserInfo";

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

export const updateUserInfo: RequestHandler = async (req, res, next) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "..", "public", "avatars"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const { isValid, message } = validateFile(
        file as Express.Multer.File,
        "image",
        "Kindly select a profile picture",
        "Only image files are allowed"
      );

      if (!isValid) {
        cb(null, false);
        return next(createHttpError.BadRequest(message));
      }

      return cb(null, true);
    },
  }).single("avatar");

  // uploading file here

  upload(req, res, async function (err) {
    const requestData = req.body;
    const { firstName, lastName, username, skills } = requestData;
    const userId = req.params.id;

    console.log("requestData ----->  ", requestData);

    // validation
    if (!firstName || !lastName || !username)
      return next(createHttpError.BadRequest("All fields are required"));

    // check for username
    const { doesExit, user } = await checkExistingUser("username", username);

    if (doesExit && user && user._id != userId)
      return next(createHttpError.Conflict("Username is already taken"));

    if (JSON.parse(skills).length == 0)
      return next(createHttpError.BadGateway("Add atleast one skill"));

    // not changing avatar
    if (!req.file) {
      const updated = await saveUserInfo(
        userId,
        firstName,
        lastName,
        username,
        JSON.parse(skills)
      );

      if (!updated) return next(createHttpError.InternalServerError());

      return successfulResponse(res, { message: "Information updated" });
    }
    // changing avatar
    else {
      if (err) return next(createHttpError.InternalServerError());

      const file = req.file;

      // if (!file)
      //   return next(createHttpError.BadRequest("Kindle select a file"));

      const avatarURL = `${process.env.SERVER_HOST}/public/avatars/${file.filename}`;

      // deleting the old avatar of the user

      const oldAvatarDeletion = await deleteOldAvatar(userId);

      if (oldAvatarDeletion.error)
        return next(
          createHttpError.InternalServerError(oldAvatarDeletion.message)
        );

      // saving avatars location in db
      const mutationError = await saveAvatarURL(userId, avatarURL);

      if (mutationError) {
        deleteFile(file.path);
        return next(createHttpError.InternalServerError());
      }

      const updated = await saveUserInfo(
        userId,
        firstName,
        lastName,
        username,
        JSON.parse(skills)
      );

      if (!updated) return next(createHttpError.InternalServerError());

      return successfulResponse(res, { message: "Information updated" });
    }
  });
};

export const updateUserAbout: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const { about } = req.body;

  try {
    await User.updateOne({ _id: id }, { bio: about });

    return successfulResponse(res, { message: "About updated" });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }
};
