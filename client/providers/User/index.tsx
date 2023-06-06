import axios, { AxiosError } from "axios";
import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import User from "../../interfaces/User";
import reducer from "./reducer";
import Loader from "../../components/utils/Loader";
import { useRouter } from "next/router";

export interface State extends User {
  profilePicture: string;
  updateAbout?(about: string): void;
  updateProjects?(projects: unknown[]): void;
}

const initialUserState: State = {
  firstName: "",
  lastName: "",
  username: "",
  profilePicture: "",
  skills: [],
  projects: [],
  bio: "",
};

const UserContext = createContext<State>(initialUserState);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [fetchUser, setFetchUser] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialUserState);
  const router = useRouter();
  const { isLoading, isError } = useQuery(
    "user-query",
    () => axios.get(`/user/${router.query.id}`),
    {
      enabled: fetchUser,
      onSuccess: (res) => {
        const { user } = res.data;

        const {
          firstName,
          lastName,
          username,
          skills,
          bio,
          projects,
          profilePicture,
        } = user;
        dispatch({ type: "FIRSTNAME", payload: firstName });
        dispatch({ type: "LASTNAME", payload: lastName });
        dispatch({ type: "USERNAME", payload: username });
        dispatch({ type: "SKILLS", payload: skills });
        dispatch({ type: "ABOUT", payload: bio });
        dispatch({ type: "PROJECTS", payload: projects });
        dispatch({ type: "AVATAR", payload: profilePicture });

        console.log("fetched user projects => ", projects);
      },
      onError: (err) => {
        console.log("error ran");
        if (err instanceof AxiosError) {
          console.log(err.response?.data.error.status);
          // if (err.response?.data.error.status == 401) router.push("/login");
        }
      },
    }
  );

  const updateAbout = (about: string) => {
    dispatch({ type: "ABOUT", payload: about });
  };

  const updateProjects = (projects: unknown[]) => {
    dispatch({ type: "PROJECTS", payload: projects });
  };

  useEffect(() => {
    if (router.query.id) setFetchUser(true);
  }, [router.query]);

  if (isLoading) return <Loader />;

  if (isError) return null;

  return (
    <UserContext.Provider value={{ ...state, updateAbout, updateProjects }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
