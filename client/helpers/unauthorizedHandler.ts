import { AxiosError } from "axios";

export default (err: unknown) => {
  console.log("called");

  if (err instanceof AxiosError && err.response && err.response.status) {
    console.log(err.response?.status);
    window.location.href = "/login";
  }
};
