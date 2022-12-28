import Link from "next/link";
import React from "react";
import Props from "./Props";

const Logo: React.FC<Props> = ({ white }) => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-3xl font-bold uppercase">
          <span className={white ? "text-white" : "text-black"}>true</span>
          <span className="text-red-600">skilled</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
