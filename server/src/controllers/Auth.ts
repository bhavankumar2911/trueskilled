import { RequestHandler } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import { checkExistingUser } from "../services/auth/checkExistingUser";
import { hashPassword } from "../services/auth/hashPassword";
import saveUserInDB from "../services/auth/saveUserInDB";
import validateSignupData from "../services/auth/validateSignupData";
import multer from "multer";
import path from "path";
import validateFile from "../helpers/validateFile";
import validateCompleteProfileData from "../services/auth/validateCompleteProfileData";
import User from "../models/User";

export const signup: RequestHandler = async (req, res, next) => {
  const data = req.body;

  //   data validation
  const { isValid, message } = validateSignupData(data);
  if (!isValid) return next(createHttpError.BadRequest(message));

  //   checking existing users
  const { doesExit, error } = await checkExistingUser("email", data.email);

  if (error) return next(createHttpError.InternalServerError());
  else if (doesExit)
    return next(
      createHttpError.Conflict("An account with this email address exists")
    );

  // hashing password
  const passwordHash = hashPassword(data.passwordConfirm);

  // save user in db
  if (await saveUserInDB(data, passwordHash))
    return successfulResponse(res, {
      message: "Your account has been created",
    });
  else return next(createHttpError.InternalServerError());
};

// complete profile controller
export const completeProfile: RequestHandler = async (req, res, next) => {
  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, path.join(__dirname, "..", "..", "public", "avatars"));
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + "-" + file.originalname);
  //   },
  // });

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
  // }).single("profilePicture");

  // upload(req, res, function (err) {
  //   const file = req.file;

  //   let { isValid, message } = validateFile(
  //     file as Express.Multer.File,
  //     "image"
  //   );

  //   if (!isValid) return next(createHttpError.BadRequest(message));

  const data = req.body;
  const id = req.params.id;

  const validation = validateCompleteProfileData(data);

  if (!validation.isValid)
    return next(createHttpError.BadRequest(validation.message));

  const { skills, username, bio } = data;

  try {
    const response = await User.updateOne(
      { _id: id },
      { username, bio, skills }
    );

    console.log(response);

    return successfulResponse(res, {
      message: "Profile information saved",
    });
  } catch (error) {
    return next(createHttpError.InternalServerError());
  }

  // });
};
