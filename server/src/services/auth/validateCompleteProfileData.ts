import isAlphanumeric from "validator/lib/isAlphanumeric";
import CompleteProfileData from "../../interfaces/CompleteProfileData";

export default (data: CompleteProfileData) => {
  let { skills, username, bio } = data;

  const validation = {
    isValid: true,
    message: "",
  };

  //   empty fields check
  if (!(skills && username && bio)) {
    validation.isValid = false;
    validation.message = "Please fill in all fields";
  }

  // username validation
  else if (!isAlphanumeric(username)) {
    validation.isValid = false;
    validation.message = "Username can contain only alphabets and numbers";
  } else {
    // skills = JSON.parse(skills);

    if (skills.length < 1) validation.isValid = false;
    validation.message = "Enter atleast one skill";
  }

  return validation;
};
