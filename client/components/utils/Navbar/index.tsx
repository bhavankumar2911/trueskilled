import React, { useState } from "react";
import Logo from "../Logo";
import { BiMenuAltRight } from "react-icons/bi";
import Wrapper from "../Wrapper";
import { HiOutlineHome } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import NavLink from "../NavLink";
import { BiUser } from "react-icons/bi";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <nav
        className={`bg-white fixed z-20 top-0 left-0 right-0 border-b md:h-[70px] ${
          showLinks ? "h-auto" : "h-[70px]"
        }`}
      >
        <Wrapper className="!p-0 flex h-full">
          <div className="w-full pt-4">
            {/* mobile top */}
            <div className="flex items-center justify-between">
              <span>
                <Logo />
              </span>
              {/* action buttons for mobile view */}
              <span
                className="cursor-pointer md:hidden"
                onClick={() => setShowLinks(!showLinks)}
              >
                <span className={`text-2xl ${!showLinks ? "block" : "hidden"}`}>
                  <BiMenuAltRight />
                </span>
                <span className={showLinks ? "block" : "hidden"}>
                  <GrClose />
                </span>
              </span>

              {/* links for desktop view */}
              <ul className="hidden md:flex items-center gap-10">
                <NavLink href="/">
                  <span>
                    <HiOutlineHome />
                  </span>
                  <span>home</span>
                </NavLink>
                <NavLink href="/user">
                  <span>
                    <BiUser />
                  </span>
                  <span>profile</span>
                </NavLink>
              </ul>
            </div>
            {/* mobile bottom */}
            <div
              className={`py-5 border-t text-center md:hidden mt-4 ${
                showLinks ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col items-center">
                <NavLink href="/">
                  <span>
                    <HiOutlineHome />
                  </span>
                  <span>home</span>
                </NavLink>
                <NavLink href="/user">
                  <span>
                    <BiUser />
                  </span>
                  <span>profile</span>
                </NavLink>
              </ul>
            </div>
          </div>
        </Wrapper>
      </nav>
      <div className="h-[70px] border bg-green-50"></div>
    </>
  );
};

export default Navbar;
