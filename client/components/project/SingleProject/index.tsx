import Image from "next/image";
import React, { FC } from "react";
import Project from "../../../interfaces/Project";
import Button from "../../utils/Button";
import ItemBadges from "../../utils/ItemBadges";
import { RiGitRepositoryLine } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import Input from "../../utils/Input";
import CommentsList from "../commentsList";

const SingleProject: FC<{ project: Project }> = ({ project }) => {
  const {
    title,
    description,
    thumbnail,
    tags,
    repositoryLink,
    previewLink,
    video,
    _id,
  } = project;

  return (
    <div>
      <h1 className="font-bold text-2xl relative after:absolute after:-bottom-4 after:left-0 after:content-[''] after:h-1 after:w-20 after:bg-primary lg:text-3xl lg:leading-[45px]">
        {title}
      </h1>
      <div className="border-b pb-7 lg:pb-10">
        <div className="w-full h-[150px] mt-10 relative lg:h-[200px] lg:mt-14">
          <Image src={thumbnail} alt={title} className="object-cover" fill />
        </div>
        <ItemBadges badges={tags} className="mt-7 lg:mt-10" />
      </div>

      <h2 className="font-semibold text-lg mt-5 lg:mt-10">About the project</h2>
      <p className="mt-3 border-b pb-7 lg:pb-10">{description}</p>

      <h2 className="font-semibold text-lg mt-5 lg:mt-10">Links</h2>
      <div
        className={`flex items-center flex-wrap gap-5 mt-3 pb-7 lg:pb-10 lg:mt-5 border-b`}
      >
        {repositoryLink ? (
          <Button href={repositoryLink}>
            <RiGitRepositoryLine /> repository
          </Button>
        ) : (
          <Button href={previewLink}>
            <MdRemoveRedEye /> preview
          </Button>
        )}
      </div>

      <h2 className="font-semibold text-lg mt-5 lg:mt-10">Comments</h2>
      <div className="mt-3 border-b pb-7 lg:pb-10">
        <CommentsList project={project} />
      </div>

      {video && (
        <>
          <h2 className="font-semibold text-lg mt-5">Working Video</h2>

          <video width="100%" className="mt-3 lg:mt-5" controls>
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </>
      )}
    </div>
  );
};

export default SingleProject;
