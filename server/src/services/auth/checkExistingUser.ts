import User from "../../models/User";

// checking existing users
export const checkExistingUser = async (
  field: "email" | "username",
  value: string
) => {
  let result = {
    doesExit: false,
    error: false,
  };

  try {
    //   check by email
    if (field == "email") {
      const existingUser = await User.findOne({ email: value }, "_id");

      if (existingUser) result.doesExit = true;
    }
    //   check by username
    else {
      const existingUser = await User.findOne({ username: value }, "_id");

      if (existingUser) result.doesExit = true;
    }
  } catch (error) {
    console.log("Cannot check existing user", error);
    result.error = true;
  } finally {
    return result;
  }
};
