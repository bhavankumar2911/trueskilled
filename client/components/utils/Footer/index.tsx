import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary flex justify-center items-center gap-2 text-white py-5 mt-10">
      <Link href="/">
        <b>TrueSkilled</b>
      </Link>
      <span className="h-[30px] w-[1px] block bg-white"></span>
      <p>
        Copyright <sup>&copy;</sup> {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
