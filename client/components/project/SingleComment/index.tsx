import Link from "next/link";
import React, { FC, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Comment from "../../../interfaces/Comment";
import Project from "../../../interfaces/Project";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import Error from "../../utils/Error";
import Modal from "../../utils/Modal";
import EditComment from "../EditComment";

interface Props {
  comment: Comment;
  editable?: boolean;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

const SingleComment: FC<Props> = ({
  comment,
  editable,
  project,
  setProject,
}) => {
  const [error, setError] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);
  const [commentState, setCommentState] = useState(comment);

  console.log(comment);

  const { mutate: deleteComment } = useMutation(
    () =>
      axios.delete(`/project/comment/${project._id}?commentId=${comment._id}`),
    {
      onSuccess: (res) => {
        setProject({ ...project, comments: res.data.comments });
      },
      onError: (err) => {
        err instanceof AxiosError && setError(err.response?.data.error.message);
      },
    }
  );
  // delete comment

  return (
    <li className="border-b pt-3 pb-4 last:border-0">
      {error && <Error error={error} setError={setError} />}
      <Modal
        title="Edit comment"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <EditComment
          comment={commentState}
          setComment={setCommentState}
          project={project}
          setProject={setProject}
          setShowModal={setShowModal}
        />
      </Modal>
      <div className="flex justify-end">
        {editable ? (
          <span className="flex gap-2 text-gray-400">
            <RiEdit2Fill
              onClick={() => setShowModal(true)}
              className="hover:text-black cursor-pointer"
            />
            <MdDelete
              onClick={() => deleteComment()}
              className="hover:text-black cursor-pointer"
            />
          </span>
        ) : (
          ""
        )}
      </div>
      <p>{commentState.comment}</p>
      <p>
        <small>
          by{" "}
          <Link
            className="text-blue-500"
            href={`/user?id=${commentState.userId}`}
          >
            @{commentState.username}
          </Link>
        </small>
      </p>
    </li>
  );
};

export default SingleComment;
