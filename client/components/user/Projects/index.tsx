import React, { FC } from "react";
import Button from "../../utils/Button";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

interface Props {
  editProject?: boolean;
  projects: unknown[];
}

const Projects: FC<Props> = ({ editProject, projects }) => {
  return (
    <SectionCard>
      {editProject && projects.length > 0 && (
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

      {projects.length == 0 && (
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
    </SectionCard>
  );
};

export default Projects;
