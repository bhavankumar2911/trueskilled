import React, { FC, FormEventHandler, useReducer } from "react";
import Avatar from "../../utils/Avatar";
import AvatarPlaceholder from "../../../public/avatar.png";
import Input from "../../utils/Input";
import SkillSelector from "../../utils/AddSkill";
import FormLabel from "../../utils/FormLabel";
import Button from "../../utils/Button";

interface Props {
  name: string;
  username: string;
  skills: string[];
  avatar: string;
}

interface State extends Props {
  skill: string;
}

interface Action {
  type: "ADD_SKILL" | "REMOVE_SKILL" | "EDIT_SKILL" | "CHANGE_AVATAR";
  payload: unknown;
}

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, payload as string],
        skill: "",
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: [
          ...state.skills.filter((skill) => skill != (payload as string)),
        ],
      };
    case "EDIT_SKILL":
      return { ...state, skill: payload as string };
    case "CHANGE_AVATAR":
      return { ...state, avatar: payload as string };
    default:
      return { ...state };
  }
};

const EditInfo: FC<Props> = ({ name, username, skills, avatar }) => {
  const [state, dispatch] = useReducer(reducer, {
    name,
    username,
    skills,
    skill: "",
    avatar,
  });

  const addSkill = (skill: string) => {
    if (!skill) return;
    dispatch({ type: "ADD_SKILL", payload: skill.toLowerCase() });
  };

  const removeSkill = (skill: string) =>
    dispatch({ type: "REMOVE_SKILL", payload: skill });

  const editSkill = (skill: string) =>
    dispatch({ type: "EDIT_SKILL", payload: skill });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      dispatch({ type: "CHANGE_AVATAR", payload: URL.createObjectURL(file) });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <center>
            <Avatar src={state.avatar ? state.avatar : AvatarPlaceholder} />
            <div className="mb-4 justify-center flex items-center sm:ml-10">
              <FormLabel className="mr-2 mt-1">Change photo</FormLabel>
              <input
                type="file"
                className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent w-[105px]"
                onChange={handleFileSelect}
              />
            </div>
          </center>
        </div>
        <Input type="text" placeholder="Name" value={state.name} block />
        <Input
          type="text"
          placeholder="Username"
          value={state.username}
          block
        />
        <SkillSelector
          skill={state.skill}
          skills={state.skills}
          addSkill={addSkill}
          removeSkill={removeSkill}
          editSkill={editSkill}
        />
        <Button type="submit" block>
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditInfo;
