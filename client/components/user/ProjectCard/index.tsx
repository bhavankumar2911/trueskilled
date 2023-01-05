import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IProject } from "../Projects";

export interface IProps {
  project: IProject;
  editProject: boolean;
}

const ProjectCard: FC<IProps> = ({ project, editProject }) => {
  return (
    <li className="border-b pb-5 last:p-0 mt-5 first:m-0 last:border-none hover:scale-105 transition-all w-full max-w-[250px] md-lg:m-0 md-lg:pb-0 md-lg:border-none rounded-sm overflow-hidden">
      <Link href={`/project/${project.id}`}>
        <div className="relative h-[150px]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-center mt-5">
          {project.title.length < 35
            ? project.title
            : project.title.substring(0, 35) + "..."}
        </h3>
      </Link>
    </li>
  );
};

export default ProjectCard;
