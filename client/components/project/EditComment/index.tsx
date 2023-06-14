import React, { FC, useState } from "react";
import Comment from "../../../interfaces/Comment";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import Project from "../../../interfaces/Project";
import Error from "../../utils/Error";

interface Props {
  comment: Comment;
  setComment: React.Dispatch<React.SetStateAction<Comment>>;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditComment: FC<Props> = ({
  comment,
  setComment,
  project,
  setProject,
  setShowModal,
}) => {
  const [newComment, setNewComment] = useState(comment.comment);
  const [error, setError] = useState<null | string>(null);
  const { mutate: editComment } = useMutation(
    () =>
      axios.patch(`/project/comment/${project._id}`, {
        commentId: comment._id,
        comment: newComment,
      }),
    {
      onSuccess: (res) => {
        console.log(res.data.comments);

        setComment({ ...comment, comment: newComment });
        setShowModal(false);
      },
      onError: (err) => {
        err instanceof AxiosError && setError(err.response?.data.error.message);
      },
    }
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editComment();
      }}
    >
      {error && <Error error={error} setError={setError} />}
      <Input
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        textarea
        block
      />
      <Button block>Confirm changes</Button>
    </form>
  );
};

export default EditComment;
