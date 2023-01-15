import React, { FC, MouseEventHandler, ReactNode, useEffect } from "react";
import { GrClose } from "react-icons/gr";

interface Props {
  children: ReactNode;
  title: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<Props> = ({ children, title, showModal, setShowModal }) => {
  useEffect(() => {
    if (showModal) document.body.style.overflowY = "hidden";
  }, [showModal]);

  const closeModal: MouseEventHandler<HTMLElement> = (e) => {
    document.body.style.overflowY = "scroll";
    const element = e.target as HTMLElement;
    if (element.id == "modal-backdrop") return setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      onClick={closeModal}
      id="modal-backdrop"
      className="bg-[rgba(0,0,0,0.5)] fixed inset-0 z-20 flex items-center justify-center"
    >
      <div
        className="bg-white w-11/12 p-5 rounded-sm max-h-[70vh] overflow-y-scroll max-w-[650px]"
        onClick={closeModal}
      >
        <div className="flex justify-between items-center mb-5 h-[50%]">
          <h2 className="capitalize font-semibold text-lg">{title}</h2>
          <span onClick={() => setShowModal(false)}>
            <GrClose />
          </span>
        </div>
        <div className="h-[90%]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
