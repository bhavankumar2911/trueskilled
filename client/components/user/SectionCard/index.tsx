import React, { FC } from "react";
import Props from "./Props";

const SectionCard: FC<Props> = ({ children }) => {
  return (
    <section className="rounded-sm shadow-gray-400/50 shadow-2xl border-t-primary flex flex-col items-center p-10 bg-white mb-10">
      {children}
    </section>
  );
};

export default SectionCard;
