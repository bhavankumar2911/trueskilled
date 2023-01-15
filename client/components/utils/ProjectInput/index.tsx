import React, { FC, FormEventHandler, useReducer, useState } from "react";
import AddSkill from "../AddSkill";
import Button from "../Button";
import FormLabel from "../FormLabel";
import Input from "../Input";

interface State {
  title: string;
  description: string;
  tags: string[];
  tag: string;
  repositoryLink: string;
  previewLink: string;
  demoVideo: string;
}

interface Props {
  edit: boolean;
  title?: string;
  description?: string;
  tags?: string[];
  repositoryLink?: string;
  previewLink?: string;
  demoVideo?: string;
}

interface Action {
  type: "ADD_TAG" | "REMOVE_TAG" | "EDIT_TAG";
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
    default:
      return { ...state };
  }
};

const ProjectInput: FC<Props> = ({
  edit,
  title,
  description,
  tags,
  repositoryLink,
  previewLink,
  demoVideo,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    title: title ? title : "",
    description: description ? description : "",
    tags: tags ? tags : [],
    tag: "",
    repositoryLink: repositoryLink ? repositoryLink : "",
    previewLink: previewLink ? previewLink : "",
    demoVideo: demoVideo ? demoVideo : "",
  });

  const addTag = (tag: string) => {
    if (tag && !state.tags.includes(tag))
      return dispatch({ type: "ADD_TAG", payload: state.tag });
  };

  const removeTag = (tag: string) =>
    dispatch({ type: "REMOVE_TAG", payload: tag });

  const editTag = (tag: string) => dispatch({ type: "EDIT_TAG", payload: tag });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Project Title*" block />
      <Input placeholder="Project Description*" textarea block />
      <FormLabel>Thumbnail*</FormLabel>
      <input
        type="file"
        className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent mb-4"
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
      <Input type="url" placeholder="Repository Link" className="mb-2" block />
      <p className="mb-2 text-center">or</p>
      <Input type="url" placeholder="Preview Link" block />
      <FormLabel>
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
      />

      <Button block>Add</Button>
    </form>
  );
};

export default ProjectInput;
