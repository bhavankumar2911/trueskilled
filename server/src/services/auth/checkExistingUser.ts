import { IUser } from "../../interfaces/IUser";
import User from "../../models/User";

// checking existing users
export const checkExistingUser = async (
  field: "email" | "username",
  value: string
) => {
  interface Result {
    doesExit: boolean;
    error: boolean;
    user?: IUser;
  }
  let result: Result = {
    doesExit: false,
    error: false,
  };

  try {
    //   check by email
    if (field == "email") {
      const existingUser = await User.findOne({
        email: value,
      });

      if (existingUser) {
        result.doesExit = true;
        result.user = existingUser;
      }
    }
    //   check by username
    else {
      const existingUser = await User.findOne({
        username: value,
      });

      if (existingUser) {
        result.doesExit = true;
        result.user = existingUser;
      }
    }
  } catch (error) {
    result.error = true;
  } finally {
    return result;
  }
};
