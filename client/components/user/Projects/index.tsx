import React, { FC, useState } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Button from "../../utils/Button";
import Modal from "../../utils/Modal";
import ProjectInput from "../../utils/ProjectInput";
import ProjectCard from "../ProjectCard";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

export interface IProject {
  title: string;
  thumbnail: string;
  _id: string;
  upvotes: string[];
  comments: string[];
}

const ProjectList: FC<{ projects: unknown[]; editProject: boolean }> = ({
  projects,
  editProject,
}) => (
  <ul className="flex justify-center w-full flex-col items-center gap-5 mt-10 sm:flex-row sm:flex-wrap md-lg:items-center md:gap-10">
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
  const { projects, username, firstName } = useUserContext();
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const editProject = user ? (user.username == username ? true : false) : false;

  let Output: JSX.Element;

  // unauthorized
  if (!editProject) {
    if (projects.length == 0) {
      Output = <p>{firstName} hasn't posted any projects</p>;
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
          <Button onClick={() => setShowModal(true)}>post now</Button>
          <Modal
            title="Add Project"
            showModal={showModal}
            setShowModal={setShowModal}
          >
            <ProjectInput setShowModal={setShowModal} edit={true} />
          </Modal>
        </div>
      );
    } else {
      Output = (
        <div className="w-full">
          <div className="flex justify-between items-start w-full mb-2 flex-wrap">
            <SectionTitle>Projects</SectionTitle>
            <Button onClick={() => setShowModal(true)}>add project</Button>
            <Modal
              title="Add Project"
              showModal={showModal}
              setShowModal={setShowModal}
            >
              <ProjectInput setShowModal={setShowModal} edit={true} />
            </Modal>
          </div>
          <ProjectList projects={projects} editProject={editProject} />
        </div>
      );
    }
  }

  return <SectionCard>{Output}</SectionCard>;
};

export default Projects;
