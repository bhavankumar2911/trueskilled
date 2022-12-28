import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-3xl font-bold uppercase">
          <span>true</span>
          <span className="text-red-600">skilled</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
