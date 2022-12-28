import Link from "next/link";
import React from "react";
import Props from "./Props";

const Logo: React.FC<Props> = ({ white }) => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-3xl font-bold">
          <span className={white ? "text-white" : "text-indigo-900"}>True</span>
          <span className="text-green-500">Skilled</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
