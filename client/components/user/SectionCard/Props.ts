import { ReactNode } from "react";

export default interface Props {
  editAccount?: boolean;
  children: ReactNode;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
