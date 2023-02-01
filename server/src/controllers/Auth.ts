import { RequestHandler } from "express";
import createHttpError from "http-errors";
import successfulResponse from "../helpers/successfulResponse";
import { checkExistingUser } from "../services/auth/checkExistingUser";
import { hashPassword } from "../services/auth/hashPassword";
import saveUserInDB from "../services/auth/saveUserInDB";
import validateCompleteProfileData from "../services/auth/validateCompleteProfileData";
import validateSignupData from "../services/auth/validateSignupData";

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

export const completeProfile: RequestHandler = async (req, res, next) => {
  const data = req.body;

  const { isValid, message } = validateCompleteProfileData(data);

  if (!isValid) return next(createHttpError.BadRequest(message));

  return successfulResponse(res, {
    message: "Profile information saved",
  });
};
