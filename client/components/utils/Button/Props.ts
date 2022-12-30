import React, { ReactNode } from "react";

export default interface Props {
  children: ReactNode;
  className?: string;
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: // | React.FormEventHandler<HTMLFormElement>
  React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
}
