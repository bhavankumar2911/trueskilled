import React from "react";

export default interface Props {
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
  block?: boolean;
  textarea?: boolean;
}
