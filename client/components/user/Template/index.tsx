import React, { FC } from "react";
import Wrapper from "../../utils/Wrapper";
import About from "../About";
import Info from "../Info";
import Projects from "../Projects";
import Navbar from "../../utils/Navbar";

const UserPageLayout: FC = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <Wrapper>
        <div className="sm:grid sm:grid-cols-2 sm:gap-10 md-lg:grid-cols-3">
          <div className="sm:col-span-1 md-lg:col-span-1">
            <Info externalData={false} />
            <About externalData={false} />
          </div>

          <div className="sm:col-span-1 md-lg:col-span-2">
            <Projects />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default UserPageLayout;
