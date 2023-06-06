import React, { FC, useState } from "react";
import Project from "../../../interfaces/Project";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useAppContext } from "../../../providers/App";
import unauthorizedHandler from "../../../helpers/unauthorizedHandler";
import Error from "../../utils/Error";

const CommentsList: FC<{ project: Project }> = ({ project }) => {
  const { loggedIn, user } = useAppContext();
  const [comment, setComment] = useState("");
  const [error, setError] = useState<null | string>(null);

  const { mutate } = useMutation(
    (comment: string) =>
      axios.post(`/project/comment/${project._id}`, {
        comment,
        username: user?.username,
      }),
    {
      onSuccess: (res) => console.log(res.data),
      onError: (err) => {
        console.log(err);

        unauthorizedHandler(err);
        if (err instanceof AxiosError && err.response)
          setError(err.response.data.error.message);
      },
    }
  );

  return (
    <section>
      {error && <Error error={error as string} setError={setError} />}

      {!project.comments.length && (
        <p className="text-center text-gray-400">
          Be the first one to comment on this project!
        </p>
      )}

      <ul>
        {project.comments.length != 0 && "comments"}

        {loggedIn ? (
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              mutate(comment);
            }}
          >
            <Input
              placeholder="Add comment here.."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              textarea
              block
            />
            <Button type="submit">Add</Button>
          </form>
        ) : (
          <div className="text-center mt-10">
            <p>You must log in to post a comment</p>
            <Button className="mt-5" href="/login">
              Log in
            </Button>
          </div>
        )}
      </ul>
    </section>
  );
};

export default CommentsList;
