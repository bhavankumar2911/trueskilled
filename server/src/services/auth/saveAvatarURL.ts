import User from "../../models/User";

export default async (userID: string, avatarURL: string) => {
  try {
    await User.findByIdAndUpdate(userID, {
      profilePicture: avatarURL,
    });

    return false;
  } catch (error) {
    return true;
  }
};
