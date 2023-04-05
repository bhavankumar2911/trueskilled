import React, { FC, FormEventHandler, useReducer, useState } from "react";
import Avatar from "../../utils/Avatar";
import AvatarPlaceholder from "../../../public/avatar.png";
import Input from "../../utils/Input";
import SkillSelector from "../../utils/AddSkill";
import FormLabel from "../../utils/FormLabel";
import Button from "../../utils/Button";
import axios, { AxiosError } from "axios";
import { useUserContext } from "../../../providers/User";
import { useMutation } from "react-query";
import Error from "../../utils/Error";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  skills: string[];
  avatar: string;
}

interface State extends Props {
  skill: string;
}

interface Action {
  type:
    | "ADD_SKILL"
    | "REMOVE_SKILL"
    | "EDIT_SKILL"
    | "CHANGE_AVATAR"
    | "USERNAME"
    | "FIRSTNAME"
    | "LASTNAME";
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
    case "FIRSTNAME":
      return { ...state, firstName: payload as string };
    case "LASTNAME":
      return { ...state, lastName: payload as string };
    case "USERNAME":
      return { ...state, username: payload as string };
    default:
      return { ...state };
  }
};

const updateInfo = (data: FormData) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return axios.patch(`/user/info/${params.get("id")}`, data);
};

const EditInfo: FC<Props> = ({
  firstName,
  lastName,
  username,
  skills,
  avatar,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    firstName,
    lastName,
    username,
    skills,
    skill: "",
    avatar,
  });
  const [file, setFile] = useState<File | null>(null);
  const { mutate } = useMutation(updateInfo, {
    onSuccess: (res) => console.log(res.data),
    onError: (err) => {
      if (err instanceof AxiosError && err.response)
        setError(err.response.data.error.message);
    },
  });
  const [error, setError] = useState<null | string>(null);

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
    console.log(state);
    const data = new FormData();
    data.append("avatar", file as File);
    data.append("firstName", state.firstName);
    data.append("lastName", state.lastName);
    data.append("username", state.username);
    data.append("skills", JSON.stringify(state.skills));
    console.log(data.get("avatar"));
    console.log(data.get("firstName"));
    console.log(data.get("lastName"));
    console.log(data.get("username"));
    console.log(data.get("skills"));

    mutate(data);
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const tempFile = e.target.files[0];
      dispatch({
        type: "CHANGE_AVATAR",
        payload: URL.createObjectURL(tempFile),
      });
      setFile(tempFile);
    }
  };

  return (
    <div>
      {error && <Error error={error} setError={setError} />}
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
        <div className="sm:grid sm:grid-cols-2 sm:gap-3">
          <Input
            type="text"
            className="sm:col-span-1"
            placeholder="First Name"
            value={state.firstName}
            onChange={(e) =>
              dispatch({ type: "FIRSTNAME", payload: e.target.value })
            }
            block
          />
          <Input
            type="text"
            className="sm:col-span-1"
            placeholder="Last Name"
            value={state.lastName}
            onChange={(e) =>
              dispatch({ type: "LASTNAME", payload: e.target.value })
            }
            block
          />
        </div>

        <Input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "USERNAME", payload: e.target.value })
          }
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
