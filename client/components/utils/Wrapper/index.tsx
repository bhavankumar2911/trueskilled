import React, { FC } from "react";
import Props from "./Props";

const Wrapper: FC<Props> = ({ children, className }) => {
  return <div className={`w-11/12 mx-auto py-10 ${className}`}>{children}</div>;
};

export default Wrapper;
