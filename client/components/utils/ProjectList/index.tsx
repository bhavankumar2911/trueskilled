import React, { FC } from "react";
import { Project } from "../../../pages/projects";
import ProjectCard from "../../user/ProjectCard";

interface Props {
  projects: Project[];
}

const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <ul className="flex justify-center w-full flex-col items-center gap-10 mt-7 sm:flex-row sm:flex-wrap md-lg:items-center md:gap-10 md:mt-10">
      {projects.map((project, index) => (
        <ProjectCard
          className="!m-0"
          key={index}
          project={project}
          editProject={false}
        />
      ))}
    </ul>
  );
};

export default ProjectList;
