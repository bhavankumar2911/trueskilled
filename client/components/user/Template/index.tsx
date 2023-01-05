import React, { FC } from "react";
import Wrapper from "../../utils/Wrapper";
import About from "../About";
import Info from "../Info";
import Projects from "../Projects";

interface IProps {
  name: string;
  username: string;
  skills: string[];
  about: string;
  projects: unknown[];
}

const UserPageLayout: FC<IProps> = ({
  name,
  username,
  skills,
  about,
  projects,
}) => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Wrapper>
        <Info name={name} username={username} skills={skills} />

        <About about={about} />

        <Projects projects={projects} editProject />
      </Wrapper>
    </main>
  );
};

export default UserPageLayout;
