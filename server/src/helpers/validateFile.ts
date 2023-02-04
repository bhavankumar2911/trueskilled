import { Response } from "express";

export default (file: Express.Multer.File, fileType: "image" | "video") => {
  interface Validation {
    isValid: boolean;
    message: string;
  }

  let validation: Validation = {
    isValid: true,
    message: "",
  };

  const imageMimeTypes = ["image/jpeg", "image/png"];
  const imageExtensions = ["jpeg", "jpg", "png"];

  //   file not selected
  if (!file) {
    validation.isValid = false;
    validation.message = "Kindly select a profile picture";
  } else {
    // file properties
    const mimetype = file.mimetype;
    const extensions = file.originalname.split(".");
    const extension = extensions[extensions.length - 1];

    // image validation
    if (fileType == "image") {
      if (
        !imageMimeTypes.includes(mimetype) ||
        !imageExtensions.includes(extension)
      )
        validation.isValid = false;
      validation.message = "Only image files are allowed";
    }
    //   video validation
    else if ((fileType = "video")) {
    }
  }

  return validation;
};
