import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { HiOutlineHome } from "react-icons/hi2";

interface Props {
  href: string;
  children: ReactNode;
}

const NavLink: FC<Props> = ({ href, children }) => {
  return (
    <li className="mb-2 after:transition-all after:duration-300 after:w-0 after:h-[2px] after:block hover:after:block hover:after:content-[''] hover:after:bg-primary hover:after:h-[2px] hover:after:w-full md:translate-y-[6px]">
      <Link className="inline-flex items-center capitalize gap-1" href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
