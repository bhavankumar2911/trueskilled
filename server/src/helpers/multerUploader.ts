import multer from "multer";
import setupMulter from "./setupMulter";
import validateFile from "./validateFile";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import RequestWithMedia from "../interfaces/RequestWithMedia";

const multerUploader = (
  folderName: "avatars" | "thumbnails" | "videos",
  fileName: string,
  fileType: "image" | "video"
) => {
  //   request handler
  const requestHandler: RequestHandler = async (
    req: RequestWithMedia,
    res,
    next
  ) => {
    const storage = setupMulter(folderName);

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        const { isValid, message } = validateFile(
          file as Express.Multer.File,
          fileType
        );

        if (!isValid) {
          cb(null, false);
          return next(createHttpError.BadRequest(message));
        }

        return cb(null, true);
      },
    }).single(fileName);

    upload(req, res, async function (err) {
      if (err) return next(createHttpError.InternalServerError());

      const file = req.file;

      if (!file)
        return next(createHttpError.BadRequest("Kindly select a thumbnail"));

      const thumbnailURL = `${process.env.SERVER_HOST}/public/thumbnails/${file.filename}`;

      req.thumbnailURL = thumbnailURL;

      return next();
    });
  };

  return requestHandler;
};

export default multerUploader;
