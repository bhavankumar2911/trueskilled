import React, { FC } from "react";
import Props from "./Props";

const FormLabel: FC<Props> = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`mb-2 inline-block ${className}`}>
      {children}
    </label>
  );
};

export default FormLabel;
