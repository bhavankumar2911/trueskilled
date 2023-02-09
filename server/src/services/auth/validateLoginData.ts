import LoginData from "../../interfaces/LoginData";
import isEmail from "validator/lib/isEmail";

export default (data: LoginData) => {
  let validation = {
    isValid: true,
    message: "",
  };

  const { email, password } = data;

  //   empty fields
  if (!email || !password) {
    validation.isValid = false;
    validation.message = "Email and Password is required";

    return validation;
  } else if (!isEmail(email)) {
    validation.isValid = false;
    validation.message = "Kindly enter a valid email address";

    return validation;
  } else return validation;
};
