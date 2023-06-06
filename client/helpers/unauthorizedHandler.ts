import { AxiosError } from "axios";

export default (err: unknown) => {
  if (err instanceof AxiosError && err.response && err.response.status == 401) {
    console.log(err.response?.status);
    window.location.href = "/login";
  }
};
