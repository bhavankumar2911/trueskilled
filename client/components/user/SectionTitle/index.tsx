import React, { FC } from "react";
import Props from "./Props";

const SectionTitle: FC<Props> = ({ children }) => {
  return <h2 className="text-2xl font-bold mb-5">{children}</h2>;
};

export default SectionTitle;
