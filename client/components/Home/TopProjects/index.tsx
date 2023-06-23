import React, { useEffect, useReducer, useState } from "react";
import ProjectCard from "../../user/ProjectCard";
import Button from "../../utils/Button";
import { useQuery } from "react-query";
import axios from "axios";
import Project from "../../../interfaces/Project";
import Loader from "../../utils/Loader";
import Error from "../../utils/Error";

const TopProjects = () => {
  // const { data, isLoading } = useQuery("projects", () => axios.get("/project"));
  const [isLoading, setisLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    axios
      .get("/project")
      .then((res) => {
        setProjects(res.data.projects);
        setisLoading(false);
      })
      .catch((err) => setError(err.response?.data.error.message));
  }, []);

  return (
    <section className="mt-7 md:mt-10">
      {error && <Error setError={setError} error={error} />}
      <h2 className="font-bold text-2xl text-center text-secondary">
        Projects
      </h2>
      {isLoading && <Loader className="h-[50px] mt-10" />}
      <ul className="flex justify-center w-full flex-col items-center gap-10 mt-7 sm:flex-row sm:flex-wrap md-lg:items-center md:gap-10 md:mt-10">
        {projects.length == 0 ? (
          <p>Be the first to post a project and get noticed 😎</p>
        ) : (
          <>
            {projects.map((project: Project, index: number) => (
              <ProjectCard
                className="!m-0"
                key={index}
                project={project}
                editProject={false}
                setProjects={setProjects}
                propProjects={projects}
              />
            ))}
          </>
        )}
      </ul>
      {/* <div className="flex justify-center mt-10">
        <Button href="/projects?page=1">
          all projects <IoIosShareAlt />
        </Button>
      </div> */}
    </section>
  );
};

export default TopProjects;
