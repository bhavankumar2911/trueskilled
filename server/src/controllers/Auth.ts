import { RequestHandler } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import { checkExistingUser } from "../services/auth/checkExistingUser";
import { hashPassword } from "../services/auth/hashPassword";
import saveUserInDB from "../services/auth/saveUserInDB";
import validateSignupData from "../services/auth/validateSignupData";
import validateCompleteProfileData from "../services/auth/validateCompleteProfileData";
import User from "../models/User";
import multer from "multer";
import path from "path";
import validateFile from "../helpers/validateFile";
import { config } from "dotenv";
import saveAvatarURL from "../services/auth/saveAvatarURL";
import deleteFile from "../helpers/deleteFile";
import deleteOldAvatar from "../services/auth/deleteOldAvatar";
import validateLoginData from "../services/auth/validateLoginData";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenConfig } from "../config";
import signToken from "../services/auth/signToken";
import saveRefreshToken from "../services/auth/saveRefreshToken";

if (process.env.NODE_ENV == "development") config();

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
  const user = await saveUserInDB(data, passwordHash);
  if (user)
    return successfulResponse(res, {
      message: "Your account has been created",
      user,
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

  const { doesExit, error } = await checkExistingUser("username", username);

  if (error) return next(createHttpError.InternalServerError());
  else if (doesExit)
    return next(createHttpError.Conflict("Username is already taken"));

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

// upload avatar
export const uploadAvatar: RequestHandler = async (req, res, next) => {
  // deleting the old avatar of the user
  // const id = req.params.id;

  // const oldAvatarDeletion = await deleteOldAvatar(id);

  // if (oldAvatarDeletion.error)
  //   return next(createHttpError.InternalServerError(oldAvatarDeletion.message));

  // file upload config

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
        "image"
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
    if (err) return next(createHttpError.InternalServerError());

    const file = req.file;

    if (!file) return next(createHttpError.BadRequest("Kindle select a file"));

    const avatarURL = `${process.env.SERVER_HOST}/public/avatars/${file.filename}`;

    // deleting the old avatar of the user
    const id = req.params.id;

    const oldAvatarDeletion = await deleteOldAvatar(req.params.id);

    if (oldAvatarDeletion.error)
      return next(
        createHttpError.InternalServerError(oldAvatarDeletion.message)
      );

    // saving avatars location in db
    const mutationError = await saveAvatarURL(req.params.id, avatarURL);

    if (mutationError) {
      deleteFile(file.path);
      return next(createHttpError.InternalServerError());
    }

    return successfulResponse(res, { message: "Profile picture saved" });
  });
};

// login
export const login: RequestHandler = async (req, res, next) => {
  const data = req.body;

  // validate data
  const { isValid, message } = validateLoginData(data);

  if (!isValid) return next(createHttpError.BadRequest(message));

  // check if user exist
  const { email, password } = data;

  const { doesExit, error, user } = await checkExistingUser("email", email);

  if (error) return next(createHttpError.InternalServerError());

  if (!doesExit)
    return next(
      createHttpError.NotFound("No user with this email address exist")
    );

  // compare passwords
  if (user && !bcrypt.compareSync(password, user.password as string))
    return next(createHttpError.BadRequest("Invalid credentials"));

  // sign tokens
  const accessToken = signToken(
    TokenConfig.accessTokenSecret as string,
    {
      id: user ? user.id : "",
    },
    60
  );
  const refreshToken = signToken(
    TokenConfig.refreshTokenSecret as string,
    {
      id: user ? user.id : "",
    },
    2 * 60
  );

  // save refresh token in db
  if (!(await saveRefreshToken(user ? user.id : "", refreshToken)))
    return next(createHttpError.InternalServerError());

  // set token cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 2 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 2 * 60 * 1000,
  });

  return successfulResponse(res, {
    loggedIn: true,
    message: "Login successful",
    id: user ? user.id : "",
  });
};
