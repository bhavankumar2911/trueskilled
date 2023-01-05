import React, { FC } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Button from "../../utils/Button";
import ProjectCard from "../ProjectCard";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

export interface IProject {
  title: string;
  thumbnail: string;
  id: string;
}

const ProjectList: FC<{ projects: unknown[]; editProject: boolean }> = ({
  projects,
  editProject,
}) => (
  <ul className="flex justify-center w-full flex-col items-center gap-5 mt-10 sm:flex-row sm:flex-wrap md-lg:items-start md:gap-x-10 ">
    {projects.map((project, index) => {
      return (
        <ProjectCard
          key={index}
          project={project as IProject}
          editProject={editProject}
        />
      );
    })}
  </ul>
);

const Projects: FC = () => {
  const { projects, username, name } = useUserContext();
  const { user } = useAppContext();

  const editProject = user ? (user.username == username ? true : false) : false;

  let Output: JSX.Element;

  // unauthorized
  if (!editProject) {
    if (projects.length == 0) {
      Output = <p>{name} hasn't posted any projects</p>;
    } else {
      Output = (
        <div>
          <SectionTitle>Projects</SectionTitle>
          <ProjectList projects={projects} editProject={editProject} />
        </div>
      );
    }
  }

  // authorized
  else {
    if (projects.length == 0) {
      Output = (
        <div className="flex items-center flex-col">
          <p className="mb-3">Post projects to stand out!</p>
          <Button>post now</Button>
        </div>
      );
    } else {
      Output = (
        <div className="w-full">
          <div className="flex justify-between items-start w-full mb-2 flex-wrap">
            <SectionTitle>Projects</SectionTitle>
            <Button>add project</Button>
          </div>
          <ProjectList projects={projects} editProject={editProject} />
        </div>
      );
    }
  }

  return (
    <SectionCard>
      {/* {editProject && projects.length > 0 && (
        <div className="flex justify-between items-start w-full mb-2">
          <SectionTitle>Projects</SectionTitle>
          <Button>add project</Button>
        </div>
      )}

      {!editProject && (
        <div>
          <SectionTitle>Projects</SectionTitle>
        </div>
      )}

      {!editProject && projects.length == 0 && (
        <div className="flex items-center flex-col">
          <p className="mb-3">Post projects to stand out!</p>
          <Button>post now</Button>
        </div>
      )}

      {projects.length > 0 && (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel omnis
          sit non, minima odio reiciendis quis delectus inventore sapiente,
          consequatur, adipisci officiis rerum id pariatur commodi asperiores
          distinctio porro labore?
        </p>
      )}

      {} */}
      {Output}
    </SectionCard>
  );
};

export default Projects;
