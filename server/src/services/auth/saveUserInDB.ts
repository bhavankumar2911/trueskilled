import SignupData from "../../interfaces/SignupData";
import User from "../../models/User";

export default async (data: SignupData, passwordHash: string) => {
  try {
    const { firstName, lastName, email } = data;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    return user;
  } catch (error) {
    console.log("Cannot save user in DB", error);
    return false;
  }
};
