import multer from "multer";
import path from "path";

export default (folderName: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "..", "public", folderName));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
