import React, { FC } from "react";
import Image from "next/image";
import Props from "./Props";

const Avatar: FC<Props> = ({ src }) => {
  return (
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative">
      <Image src={src} alt="avatar" fill className="object-cover" />
    </div>
  );
};

export default Avatar;
