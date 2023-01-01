import React, { FC } from "react";
import Props from "./Props";

const Wrapper: FC<Props> = ({ children }) => {
  return <div className="w-11/12 mx-auto py-10">{children}</div>;
};

export default Wrapper;
