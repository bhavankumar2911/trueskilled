import fs from "fs";

export default (fileLocation: string) => {
  let hasDeleted = false;
  try {
    fs.unlinkSync(fileLocation);

    hasDeleted = true;
  } catch (error) {
    hasDeleted = false;

    console.log(error);
  }

  return hasDeleted;
};
