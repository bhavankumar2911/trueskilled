import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BsTriangle } from "react-icons/bs";
import { IProject } from "../Projects";
import { FaRegComment } from "react-icons/fa";

export interface IProps {
  project: IProject;
  editProject: boolean;
  className?: string;
}

const ProjectCard: FC<IProps> = ({ project, editProject, className }) => {
  return (
    <li
      className={`flex flex-col h-[270px] justify-between border pb-3 mt-5 first:m-0 hover:scale-105 hover:drop-shadow-2xl transition-all w-full md:mt-0 max-w-[250px] rounded-sm overflow-hidden hover:bg-green-50 hover:border-primary ${
        className ? className : ""
      }`}
    >
      <Link href={`/project/${project.id}`}>
        <div className="relative h-[150px]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center h-[77px]">
          <h3 className="font-semibold text-center px-3">
            {project.title.length < 35
              ? project.title
              : project.title.substring(0, 35) + "..."}
          </h3>
        </div>
      </Link>
      <div className="flex items-center justify-between px-3 border-t pt-2">
        <span className="flex items-center gap-1 text-sm cursor-pointer">
          <BsTriangle />
          <span>{project.upvotes}</span>
        </span>
        <span className="flex items-center gap-1 text-sm cursor-pointer">
          <span>{project.comments.length}</span> <FaRegComment />
        </span>
      </div>
    </li>
  );
};

export default ProjectCard;
