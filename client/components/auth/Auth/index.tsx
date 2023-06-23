import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useReducer } from "react";
import { useMutation } from "react-query";
import { useAppContext } from "../../../providers/App";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Logo from "../../utils/Logo";
import Props from "./Props";

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface LoginState {
  email: string;
  password: string;
}

interface SignupAction {
  type: "FIRSTNAME" | "LASTNAME" | "EMAIL" | "PASSWORD" | "PASSWORD_CONFIRM";
  payload: string;
}

interface LoginAction {
  type: "EMAIL" | "PASSWORD";
  payload: string;
}

const signupForm: SignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const loginForm: LoginState = {
  email: "",
  password: "",
};

const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  const { type, payload } = action;

  switch (type) {
    case "FIRSTNAME":
      return { ...state, firstName: payload };
    case "LASTNAME":
      return { ...state, lastName: payload };
    case "EMAIL":
      return { ...state, email: payload };
    case "PASSWORD":
      return { ...state, password: payload };
    case "PASSWORD_CONFIRM":
      return { ...state, passwordConfirm: payload };
    default:
      return { ...state };
  }
};

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  const { type, payload } = action;

  switch (type) {
    case "EMAIL":
      return { ...state, email: payload };
    case "PASSWORD":
      return { ...state, password: payload };
    default:
      return { ...state };
  }
};

const Auth: React.FC<Props> = ({ service }) => {
  const router = useRouter();
  const { setAppUser } = useAppContext();
  const [signupState, signupDispatch] = useReducer(signupReducer, signupForm);
  const [loginState, loginDispatch] = useReducer(loginReducer, loginForm);

  const {
    // data: signupData,
    isError: signupIsError,
    mutate: signupMutate,
    error: signupError,
  } = useMutation((data: SignupState) => axios.post("/auth/signup", data), {
    onSuccess: (data) =>
      router.push(`/complete-profile?id=${data.data.user._id}`),
  });

  const {
    // data: loginData,
    isError: loginIsError,
    mutate: loginMutate,
    error: loginError,
  } = useMutation((data: LoginState) => axios.post("/auth/login", data), {
    onSuccess: (res) => {
      const { id, user } = res.data;
      if (setAppUser) setAppUser(user);
      router.push(`/user?id=${id}`);
    },
  });

  const handleEmailChange = (email: string) => {
    if (service == "signup") {
      signupDispatch({ type: "EMAIL", payload: email });
    } else {
      loginDispatch({ type: "EMAIL", payload: email });
    }
  };

  const handlePasswordChange = (password: string) => {
    if (service == "signup") {
      signupDispatch({ type: "PASSWORD", payload: password });
    } else {
      loginDispatch({ type: "PASSWORD", payload: password });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (service == "signup") {
      signupMutate({ ...signupState });
    } else {
      loginMutate({ ...loginState });
    }
  };

  return (
    <main className="pb-10 sm:grid sm:grid-cols-3 sm:pb-0">
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center sm:after:content-none sm:h-screen">
        <div className="relative flex items-center z-20 sm:hidden">
          <Logo white={true} />
          <span className="bg-white block h-10 w-[1px] mx-3"></span>
          <h2 className="text-white text-xl capitalize">{service}</h2>
        </div>
      </section>

      {/* bottom */}
      <section className="sm:col-span-2 sm:h-screen sm:flex sm:items-center">
        <form
          className="w-3/4 mx-auto mt-10 max-w-[384px] sm:mt-0"
          onSubmit={handleSubmit}
        >
          <div className="hidden sm:items-center sm:flex mb-10">
            <Logo />
            <span className="bg-gray-800 block h-10 w-[1px] mx-5"></span>
            <h2 className="text-gray-800 text-xl capitalize font-semibold">
              {service}
            </h2>
          </div>

          <p
            className={`opacity-0 transition-all duration-500 ${
              signupIsError
                ? "text-red-500 border border-red-500 bg-red-50 p-3 text-center mb-7 opacity-100"
                : ""
            }`}
          >
            {signupIsError &&
              signupError instanceof AxiosError &&
              signupError.response?.data.error.message}
          </p>

          <p
            className={`opacity-0 transition-all duration-500 ${
              loginIsError
                ? "text-red-500 border border-red-500 bg-red-50 p-3 text-center mb-7 opacity-100"
                : ""
            }`}
          >
            {loginIsError &&
              loginError instanceof AxiosError &&
              loginError.response?.data.error.message}
          </p>

          {service == "signup" && (
            <Fragment>
              <div className="sm:grid sm:grid-cols-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="sm:col-span-1"
                  value={signupState.firstName}
                  onChange={(e) =>
                    signupDispatch({
                      type: "FIRSTNAME",
                      payload: e.target.value,
                    })
                  }
                  block
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="sm:col-span-1"
                  value={signupState.lastName}
                  onChange={(e) =>
                    signupDispatch({
                      type: "LASTNAME",
                      payload: e.target.value,
                    })
                  }
                  block
                />
              </div>
            </Fragment>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={service == "signup" ? signupState.email : loginState.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            block
          />
          <Input
            type="password"
            placeholder="Password"
            value={
              service == "signup" ? signupState.password : loginState.password
            }
            onChange={(e) => handlePasswordChange(e.target.value)}
            block
          />

          {service == "signup" && (
            <Input
              type="password"
              placeholder="Repeat Password"
              value={signupState.passwordConfirm}
              onChange={(e) =>
                signupDispatch({
                  type: "PASSWORD_CONFIRM",
                  payload: e.target.value,
                })
              }
              block
            />
          )}
          <Button type="submit" block>
            {service == "login" ? "log in" : "sign up"}
          </Button>
          <p className="text-center text-sm mt-5 text-gray-500">
            {service == "login" ? (
              <>
                New User? <Link href="/signup">Sign up</Link>
              </>
            ) : (
              <>
                Already have an account? <Link href="/login">Log in</Link>
              </>
            )}
          </p>
        </form>
      </section>
    </main>
  );
};

export default Auth;
