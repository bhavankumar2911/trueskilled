import { RequestHandler } from "express";

export const fetchUserProfile: RequestHandler = (req, res) => {
  const { access_token, refresh_token } = req.cookies;
};
