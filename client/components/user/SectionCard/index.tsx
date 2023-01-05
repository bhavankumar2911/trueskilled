import React, { FC } from "react";
import Props from "./Props";
import { FaEdit } from "react-icons/fa";

const SectionCard: FC<Props> = ({ children, editAccount }) => {
  if (editAccount)
    return (
      <section className="rounded-sm shadow-gray-400/50 shadow-2xl border-t-primary p-10 bg-white mb-10">
        <div className="flex justify-end w-full">
          <span className="flex items-center px-2 py-1 rounded-sm opacity-40">
            <span>
              <FaEdit />
            </span>
            {/* <span className="ml-1 inline-block text-sm">Edit</span> */}
          </span>
        </div>
        <div className="flex flex-col items-center">{children}</div>
      </section>
    );

  return (
    <section className="rounded-sm shadow-gray-400/50 shadow-2xl border-t-primary flex flex-col items-center p-10 bg-white mb-10">
      {children}
    </section>
  );
};

export default SectionCard;
