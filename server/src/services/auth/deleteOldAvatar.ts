import deleteFile from "../../helpers/deleteFile";
import User from "../../models/User";
import path from "path";

export default async (id: string) => {
  let deletion = {
    error: false,
    message: "",
  };

  const user = await User.findById(id, "profilePicture");

  if (!user) {
    deletion.error = true;
    deletion.message = "User not found";

    return deletion;
  }

  if (user.profilePicture) {
    const pathArray = user.profilePicture.split("/");
    const avatarFileName = pathArray[pathArray.length - 1];

    if (
      !deleteFile(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "public",
          "avatars",
          avatarFileName
        )
      )
    ) {
      deletion.error = true;
      deletion.message = "Internal Server Error";

      return deletion;
    }

    // if file deleted

    try {
      await User.findByIdAndUpdate(id, { profilePicture: "" });
      return deletion;
    } catch (error) {
      deletion.error = true;
      deletion.message = "Internal Server Error";

      return deletion;
    }
  }

  // if profile picture not set

  return deletion;
};
