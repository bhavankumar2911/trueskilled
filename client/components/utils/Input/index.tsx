import React from "react";
import Props from "./Props";

const Input: React.FC<Props> = ({
  type,
  name,
  id,
  placeholder,
  className,
  onChange,
  value,
  block,
  textarea,
}) => {
  const classNames = `border rounded-sm hover:border-gray-400 outline-none p-2 mb-4 ${
    block ? "w-full" : ""
  } ${className}`;

  if (textarea)
    return (
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        className={`${classNames} max-w-full`}
        onChange={onChange}
        value={value}
      ></textarea>
    );

  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={classNames}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
