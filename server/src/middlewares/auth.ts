import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import RequestWithUser from "../interfaces/RequestWithUser";
import JwtPayload from "../interfaces/JWTPayload";
import createHttpError from "http-errors";
import { TokenConfig } from "../config";
import RefreshToken from "../models/RefreshToken";
import signToken from "../services/auth/signToken";
import saveRefreshToken from "../services/auth/saveRefreshToken";
import successfulResponse from "../helpers/successfulResponse";

const auth: RequestHandler = async (req: RequestWithUser, res, next) => {
  const cookies = req.cookies;
  let decoded: JwtPayload = { id: "" };

  //   token not present
  if (!cookies.access_token || !cookies.refresh_token)
    return next(createHttpError.Unauthorized("You are unauthorized"));

  // verify access token
  try {
    const result = jwt.verify(
      cookies.access_token,
      TokenConfig.accessTokenSecret as string
    ) as JwtPayload;

    decoded.id = result.id;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name == "TokenExpiredError") {
        // verify refresh token
        try {
          const decoded = jwt.verify(
            cookies.refresh_token,
            TokenConfig.refreshTokenSecret as string
          ) as JwtPayload;
          const { id } = decoded;

          // compare with the blacklist
          let tokenRecord;
          try {
            tokenRecord = await RefreshToken.findOne({ id });
          } catch (error) {
            return next(createHttpError.InternalServerError());
          }

          if (!tokenRecord || tokenRecord.token != cookies.refresh_token) {
            return next(createHttpError.Unauthorized("You are unauthorized"));
          }

          // sign new tokens
          const newAccessToken = signToken(
            TokenConfig.accessTokenSecret as string,
            {
              id,
            },
            60
          );
          const newRefreshToken = signToken(
            TokenConfig.refreshTokenSecret as string,
            {
              id,
            },
            2 * 60
          );

          // save refresh token in db
          if (!(await saveRefreshToken(id, newRefreshToken)))
            return next(createHttpError.InternalServerError());

          // set token cookies
          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 1000,
          });
          res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 1000,
          });

          req.userId = id;

          if (req.originalUrl == "/api/auth")
            return successfulResponse(res, { message: "Authorized" });
          else return next();
        } catch (error) {
          if (error instanceof Error) {
            return next(createHttpError.Unauthorized("You are unauthorized"));
          }
        }
      } else {
        return next(createHttpError.Unauthorized("You are unauthorized"));
      }
    }
  }

  // verify refresh token
  try {
    const decoded = jwt.verify(
      cookies.refresh_token,
      TokenConfig.refreshTokenSecret as string
    ) as JwtPayload;

    // check token in blacklist
    const refreshToken = await RefreshToken.findOne({
      where: { userId: decoded.id },
    });

    if (refreshToken?.token != cookies.refresh_token) {
      return next(createHttpError.Unauthorized("You are unauthorized"));
    }

    // authorized
    req.userId = decoded.id;

    if (req.originalUrl == "/api/auth")
      return successfulResponse(res, { message: "Authorized" });
    else return next();
  } catch (error) {
    return next(createHttpError.Unauthorized("You are unauthorized"));
  }
};

export default auth;
