import React, { FC } from "react";
import Button from "../../utils/Button";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";
import Props from "./Props";

const Projects: FC<Props> = ({ projects }) => {
  return (
    <SectionCard>
      <SectionTitle>Projects</SectionTitle>

      {projects.length == 0 && (
        <div className="flex items-center flex-col">
          <p className="mb-3">Post projects to stand out!</p>
          <Button>post now</Button>
        </div>
      )}
    </SectionCard>
  );
};

export default Projects;
