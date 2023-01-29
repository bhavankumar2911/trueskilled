import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import SignupData from "../../interfaces/SignupData";

export default (data: SignupData) => {
  const { firstName, lastName, email, password, passwordConfirm } = data;

  const validation = {
    isValid: true,
    message: "",
  };

  //   empty fields check
  if (!(firstName && lastName && email && password && passwordConfirm)) {
    validation.isValid = false;
    validation.message = "Please fill in all fields";
  }

  // username validation
  else if (
    !isAlpha(firstName, "en-US", { ignore: " " }) &&
    !isAlpha(lastName, "en-US", { ignore: " " })
  ) {
    validation.isValid = false;
    validation.message = "Make sure names contain only alphabets and spaces";
  }

  //   email validation
  else if (!isEmail(email)) {
    validation.isValid = false;
    validation.message = "The email address you entered is not a valid one";
  }

  // comparing passwords
  else if (password != passwordConfirm) {
    validation.isValid = false;
    validation.message = "Oops! The passwords are not same";
  }

  return validation;
};
