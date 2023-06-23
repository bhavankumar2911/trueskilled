import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BsTriangle } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";
import { useAppContext } from "../../../providers/App";
import unauthorizedHandler from "../../../helpers/unauthorizedHandler";
import { useUserContext } from "../../../providers/User";
import Project from "../../../interfaces/Project";

export interface IProps {
  project: Project;
  editProject: boolean;
  className?: string;
  setProjects?: React.Dispatch<React.SetStateAction<never[]>>;
  propProjects?: never[];
}

const ProjectCard: FC<IProps> = ({
  project,
  editProject,
  className,
  setProjects,
  propProjects,
}) => {
  const { user } = useAppContext();
  const { projects, updateProjects } = useUserContext();
  const { mutate } = useMutation(
    () => {
      return axios.post(`/project/vote/${project._id}`, {
        username: user?.username,
      });
    },
    {
      onSuccess: (res) => {
        const tempProjects = [...projects];

        tempProjects.map((tempProject) => {
          if ((tempProject as Project)._id == project._id)
            (tempProject as Project).upvotes = [...res.data.upvotes];
        });

        updateProjects && updateProjects([...tempProjects]);

        if (propProjects && setProjects) {
          const tempProjects = [...propProjects];

          tempProjects.map((tempProject) => {
            if ((tempProject as Project)._id == project._id)
              (tempProject as Project).upvotes = [...res.data.upvotes];
          });

          setProjects && setProjects([...(tempProjects as never)]);
        }
      },
      onError: (err) => {
        unauthorizedHandler(err);
      },
    }
  );

  return (
    <li
      className={`flex flex-col h-[270px] justify-between border pb-3 mt-5 first:m-0 hover:scale-105 hover:drop-shadow-2xl transition-all w-full md:mt-0 max-w-[250px] rounded-sm overflow-hidden hover:bg-green-50 hover:border-primary ${
        className ? className : ""
      }`}
    >
      <Link href={`/project?id=${project._id}`}>
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
        <span
          onClick={() => mutate()}
          className="flex items-center gap-1 text-sm cursor-pointer"
        >
          <BsTriangle />
          <span>{project.upvotes.length}</span>
        </span>
        <span className="flex items-center gap-1 text-sm cursor-pointer">
          <span>{project.comments.length}</span> <FaRegComment />
        </span>
      </div>
    </li>
  );
};

export default ProjectCard;
