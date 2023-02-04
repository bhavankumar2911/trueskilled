import axios, { formToJSON } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEventHandler, useReducer, useState } from "react";
import { useMutation } from "react-query";
import AddSkill from "../../components/utils/AddSkill";
import Button from "../../components/utils/Button";
import FormError from "../../components/utils/FormError";
import FormLabel from "../../components/utils/FormLabel";
import Input from "../../components/utils/Input";
import Wrapper from "../../components/utils/Wrapper";

interface PostData {
  skills: string[];
  username: string;
  bio: string;
}

interface State extends PostData {
  skill: string;
}

interface Action {
  type:
    | "ADD_SKILL"
    | "REMOVE_SKILL"
    | "EDIT_SKILL"
    | "PROFILE_PICTURE"
    | "USERNAME"
    | "BIO";
  payload: string;
}

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_SKILL":
      return {
        ...state,
        skills: [
          ...(state.skills as string[]),
          (payload as string).toLowerCase(),
        ],
        skill: "",
      };

    case "REMOVE_SKILL":
      return {
        ...state,
        skills: [
          ...(state.skills as string[]).filter((skill) => skill != payload),
        ],
      };

    case "EDIT_SKILL":
      return { ...state, skill: payload as string };

    case "USERNAME":
      return { ...state, username: payload as string };

    case "BIO":
      return { ...state, bio: payload as string };

    default:
      return { ...state };
  }
};

const initialState: State = {
  skills: [],
  skill: "",
  bio: "",
  username: "",
};

const saveProfileInfo = async (data: PostData) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return axios.post(`/auth/complete-profile/${params.get("id")}`, data);
};

const CompleteProfile = () => {
  // const [localFileLink, setLocalFileLink] = useState("");
  // const [file, setFile] = useState<File | null>(null);
  // const [bio, setBio] = useState("");
  // const [skills, setSkills] = useState<string[]>([]);
  // const [skill, setSkill] = useState("");
  // const [username, setUsername] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isError, mutate, error } = useMutation(saveProfileInfo, {
    // onSuccess: (res) => console.log(res),
    // onError: (err) => console.log(err),
  });

  // console.log("Printing errror ---------> ", isError, error);

  const addSkill = () => {
    if (state.skill && !state.skills.includes(state.skill)) {
      dispatch({ type: "ADD_SKILL", payload: state.skill });
      dispatch({ type: "EDIT_SKILL", payload: "" });
    }
  };

  const removeSkill = (skill: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: skill });
  };

  const editSkill = (skill: string) =>
    dispatch({ type: "EDIT_SKILL", payload: skill });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { username, bio, skills } = state;

    console.log("printing form----------->", username, bio, skills);

    mutate({ username, bio, skills });
  };

  return (
    <main className="pb-10 sm:grid sm:grid-cols-3 sm:pb-0">
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center sm:after:content-none sm:h-screen">
        <h2 className="text-white text-2xl capitalize relative z-20 font-bold sm:hidden xs:text-3xl">
          Complete your profile
        </h2>
      </section>
      {/* bottom */}
      <section className="sm:col-span-2 sm:h-screen sm:flex sm:max-h-screen sm:overflow-y-scroll sm:px-3">
        <Wrapper>
          <form
            // method="post"
            // action="http://localhost:9000/auth/complete-profile"
            // encType="multipart/form-data"
            className="md:w-3/4 mx-auto sm:pb-10 max-w-[500px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-gray-800 hidden sm:block font-bold text-3xl mb-10">
              Complete your profile
            </h2>
            <FormError isError={isError} error={error as Error} />

            {/* <div className="flex flex-col items-center sm:flex-row">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative">
                <Image
                  src={localFileLink ? localFileLink : Avatar}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mb-4 flex items-center sm:ml-10">
                <FormLabel className="mr-2 mt-1">Profile picture</FormLabel>
                <input
                  name="file"
                  type="file"
                  className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent w-[105px]"
                  onChange={handleFileSelect}
                />
              </div>
            </div> */}
            <FormLabel>Choose a username</FormLabel>
            <Input
              name="username"
              type="text"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "USERNAME", payload: e.target.value })
              }
              block
            />
            <FormLabel>Describe yourself</FormLabel>
            <Input
              name="bio"
              value={state.bio}
              onChange={(e) =>
                dispatch({ type: "BIO", payload: e.target.value })
              }
              textarea
              block
            />
            <AddSkill
              skill={state.skill}
              skills={state.skills}
              addSkill={addSkill}
              editSkill={editSkill}
              removeSkill={removeSkill}
            />
            <Button type="submit" block>
              Save
            </Button>
          </form>
        </Wrapper>
      </section>
    </main>
  );
};

export default CompleteProfile;
