import isAlphanumeric from "validator/lib/isAlphanumeric";
import CompleteProfileData from "../../interfaces/CompleteProfileData";

export default (data: CompleteProfileData) => {
  const { profilePicture, username, bio } = data;

  const validation = {
    isValid: true,
    message: "",
  };

  //   empty fields check
  if (!(profilePicture && username && bio)) {
    validation.isValid = false;
    validation.message = "Please fill in all fields";
  }

  // username validation
  else if (!isAlphanumeric(username)) {
    validation.isValid = false;
    validation.message = "Username can contain only alphabets and numbers";
  }

  return validation;
};
