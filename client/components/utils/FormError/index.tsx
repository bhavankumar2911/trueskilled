import { AxiosError } from "axios";
import React, { FC } from "react";

interface Props {
  isError: boolean;
  error: Error;
}

const index: FC<Props> = ({ isError, error }) => {
  return (
    <p
      className={`opacity-0 transition-all duration-500 ${
        isError
          ? "text-red-500 border border-red-500 bg-red-50 p-3 text-center mb-7 opacity-100"
          : ""
      }`}
    >
      {isError &&
        error instanceof AxiosError &&
        error.response?.data.error.message}
    </p>
  );
};

export default index;
