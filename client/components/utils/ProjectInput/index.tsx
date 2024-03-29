import React, { FC, FormEventHandler, useReducer, useState } from "react";
import AddSkill from "../AddSkill";
import Button from "../Button";
import FormLabel from "../FormLabel";
import Input from "../Input";
import { useMutation } from "react-query";
import useCurrentUserID from "../../../hooks/useCurrentUserID";
import axios, { AxiosError } from "axios";
import Error from "../Error";
import { useUserContext } from "../../../providers/User";

interface State {
  title: string;
  description: string;
  tags: string[];
  tag: string;
  repositoryLink: string;
  previewLink: string;
  // demoVideo: string;
}

interface Props {
  edit: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  tags?: string[];
  repositoryLink?: string;
  previewLink?: string;
  demoVideo?: string;
}

interface Action {
  type:
    | "ADD_TAG"
    | "REMOVE_TAG"
    | "EDIT_TAG"
    | "TITLE"
    | "DESCRIPTION"
    | "REPO_LINK"
    | "PREVIEW_LINK";
  payload: boolean | string | string[];
}

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TAG":
      return {
        ...state,
        tags: [...(state.tags as string[]), (payload as string).toLowerCase()],
        tag: "",
      };

    case "REMOVE_TAG":
      return {
        ...state,
        tags: [...(state.tags as string[]).filter((tag) => tag != payload)],
      };

    case "EDIT_TAG":
      return { ...state, tag: payload as string };

    case "TITLE":
      return { ...state, title: payload as string };

    case "DESCRIPTION":
      return { ...state, description: payload as string };

    case "REPO_LINK":
      return { ...state, repositoryLink: payload as string };

    case "PREVIEW_LINK":
      return { ...state, previewLink: payload as string };

    default:
      return { ...state };
  }
};

const ProjectInput: FC<Props> = ({
  edit,
  setShowModal,
  title,
  description,
  tags,
  repositoryLink,
  previewLink,
  demoVideo,
}) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  // const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { updateProjects, projects } = useUserContext();

  const [state, dispatch] = useReducer(reducer, {
    title: title ? title : "",
    description: description ? description : "",
    tags: tags ? tags : [],
    tag: "",
    repositoryLink: repositoryLink ? repositoryLink : "",
    previewLink: previewLink ? previewLink : "",
    // demoVideo: demoVideo ? demoVideo : "",
  });
  const userID = useCurrentUserID();

  const { mutate } = useMutation(
    (formData: FormData) => axios.post(`/project/${userID}`, formData),
    {
      onSuccess: (res) => {
        updateProjects && updateProjects([res.data.project, ...projects]);
        setShowModal(false);
      },
      onError: (err) => {
        if (err instanceof AxiosError)
          setError(err.response?.data.error.message);
      },
    }
  );

  const handleThumbnailSelect: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const tempFile = e.target.files[0];
      setThumbnail(tempFile);
    }
  };

  // const handleVideoSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const tempFile = e.target.files[0];
  //     setVideo(tempFile);
  //   }
  // };

  const addTag = (tag: string) => {
    if (tag && !state.tags.includes(tag))
      return dispatch({ type: "ADD_TAG", payload: state.tag });
  };

  const removeTag = (tag: string) =>
    dispatch({ type: "REMOVE_TAG", payload: tag });

  const editTag = (tag: string) => dispatch({ type: "EDIT_TAG", payload: tag });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(state);

    const { title, description, repositoryLink, previewLink, tags } = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("repositoryLink", repositoryLink);
    formData.append("previewLink", previewLink);
    formData.append("tags", JSON.stringify(tags));
    formData.append("thumbnail", thumbnail as File);
    // formData.append("demoVideo", video as File);

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error error={error} setError={setError} />}
      <Input
        type="text"
        placeholder="Project Title*"
        value={state.title}
        onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })}
        block
      />
      <Input
        placeholder="Project Description*"
        value={state.description}
        onChange={(e) =>
          dispatch({ type: "DESCRIPTION", payload: e.target.value })
        }
        textarea
        block
      />
      <FormLabel>Thumbnail*</FormLabel>
      <input
        type="file"
        className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent mb-4"
        onChange={handleThumbnailSelect}
      />
      <FormLabel>Add related tags</FormLabel>
      {/* skill refers to tag here */}
      <AddSkill
        skills={state.tags as string[]}
        skill={state.tag}
        editSkill={editTag}
        addSkill={addTag}
        removeSkill={removeTag}
      />
      <FormLabel>Additional Information</FormLabel>
      <Input
        type="url"
        placeholder="Repository Link"
        className="mb-2"
        value={state.repositoryLink}
        onChange={(e) =>
          dispatch({ type: "REPO_LINK", payload: e.target.value })
        }
        block
      />
      <p className="mb-2 text-center">or</p>
      <Input
        type="url"
        placeholder="Preview Link"
        value={state.previewLink}
        onChange={(e) =>
          dispatch({ type: "PREVIEW_LINK", payload: e.target.value })
        }
        block
      />
      {/* <FormLabel>
        Demo Video{" "}
        <small className="text-gray-500 mt-1">
          (Recommended for hardware projects)
        </small>
      </FormLabel>
      <input
        type="file"
        className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent mb-4"
      /> */}

      <Button block>Add</Button>
    </form>
  );
};

export default ProjectInput;
