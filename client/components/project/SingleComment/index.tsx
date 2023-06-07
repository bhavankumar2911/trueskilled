import Link from "next/link";
import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Comment from "../../../interfaces/Comment";

interface Props {
  comment: Comment;
  editable?: boolean;
}

const SingleComment: FC<Props> = ({ comment, editable }) => {
  return (
    <li className="border-b pt-3 pb-4 last:border-0">
      <div className="flex justify-end">
        {editable ? (
          <span className="flex gap-2 text-gray-400">
            <RiEdit2Fill className="hover:text-black cursor-pointer" />
            <MdDelete className="hover:text-black cursor-pointer" />
          </span>
        ) : (
          ""
        )}
      </div>
      <p>{comment.comment}</p>
      <p>
        <small>
          by{" "}
          <Link className="text-blue-500" href={`/user?id=${comment.userId}`}>
            @{comment.username}
          </Link>
        </small>
      </p>
    </li>
  );
};

export default SingleComment;
