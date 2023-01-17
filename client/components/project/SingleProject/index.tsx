import Image from "next/image";
import React, { FC } from "react";
import Project from "../../../interfaces/Project";

const SingleProject: FC<{ project: Project }> = ({ project }) => {
  const {
    title,
    description,
    thumbnail,
    tags,
    repositoryLink,
    previewLink,
    demoVideo,
  } = project;

  return (
    <div>
      <div className="relative h-[200px]">
        <Image src={thumbnail} alt={title} className="object-cover" fill />
        <h2 className="text-lg font-bold text-center absolute w-full z-10 left-1/2 -translate-x-1/2 bottom-0 bg-[rgba(0,0,0,0.8)] text-white p-3">
          {title}
        </h2>
      </div>
      <h3 className="">About the project</h3>
      <p>{description}</p>
    </div>
  );
};

export default SingleProject;
