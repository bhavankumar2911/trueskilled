import multer from "multer";
import setupMulter from "./setupMulter";
import validateFile from "./validateFile";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import RequestWithMedia from "../interfaces/RequestWithMedia";

const multerUploader = (
  folderName: "avatars" | "thumbnails" | "videos",
  fileName: string,
  fileType: "image" | "video",
  emptyErrorMessage: string,
  fileTypeErrorMessage: string
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
          fileType,
          emptyErrorMessage,
          fileTypeErrorMessage
        );

        if (!isValid) {
          cb(null, false);
          return next(createHttpError.BadRequest(message));
        }

        return cb(null, true);
      },
    }).single(fileName);

    upload(req, res, async function (err) {
      console.log("uploader err => ", err);

      if (err) return next(createHttpError.InternalServerError("here"));

      const file = req.file;

      if (!file) return next(createHttpError.BadRequest(emptyErrorMessage));

      const url = `${process.env.SERVER_HOST}/public/${folderName}/${file.filename}`;

      if (fileName == "thumbnail") req.thumbnail = url;
      else req.demoVideo = url;

      return next();
    });
  };

  return requestHandler;
};

export default multerUploader;
