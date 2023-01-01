import Link from "next/link";
import React from "react";
import Props from "./Props";

const Button: React.FC<Props> = ({
  children,
  block,
  className,
  type,
  onClick,
  href,
}) => {
  const classNames = `rounded-sm capitalize px-4 py-2 font-semibold bg-primary text-white hover:bg-secondary transition ${
    block ? "w-full" : ""
  } ${className}`;

  if (href)
    return (
      <Link className={`inline-block ${classNames}`} href={href}>
        {children}
      </Link>
    );

  return (
    <button className={classNames} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;