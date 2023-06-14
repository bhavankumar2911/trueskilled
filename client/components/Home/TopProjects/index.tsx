import React, { useReducer, useState } from "react";
import ProjectCard from "../../user/ProjectCard";
import Button from "../../utils/Button";
import { useQuery } from "react-query";
import axios from "axios";
import Project from "../../../interfaces/Project";
import Loader from "../../utils/Loader";

const TopProjects = () => {
  const { data, isLoading } = useQuery("projects", () => axios.get("/project"));

  console.log(data);

  return (
    <section className="mt-7 md:mt-10">
      <h2 className="font-bold text-2xl text-center text-secondary">
        Projects
      </h2>
      {isLoading && <Loader className="h-[50px] mt-10" />}
      <ul className="flex justify-center w-full flex-col items-center gap-10 mt-7 sm:flex-row sm:flex-wrap md-lg:items-center md:gap-10 md:mt-10">
        {data?.data.projects.map((project: Project, index: number) => (
          <ProjectCard
            className="!m-0"
            key={index}
            project={project}
            editProject={false}
          />
        ))}
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
