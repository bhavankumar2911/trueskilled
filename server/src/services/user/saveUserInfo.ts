import User from "../../models/User";

const saveUserInfo = async (
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  skills: string[]
) => {
  try {
    await User.updateOne(
      { _id: id },
      { firstName, lastName, username, skills }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export default saveUserInfo;
