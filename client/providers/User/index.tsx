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
  avatar: string;
  updateAbout?(about: string): void;
}

const initialUserState: State = {
  firstName: "john",
  lastName: "doe",
  username: "johndoe",
  avatar:
    "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  skills: ["python", "java"],
  projects: [
    {
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
      upvotes: 23,
      comments: ["1", "2", "3"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      id: "2",
      upvotes: 90,
      comments: ["1", "2"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
      upvotes: 2,
      comments: ["1", "2", "3", "4"],
    },
  ],
  about:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem debitis asperiores modi doloremque sunt voluptatibus illo hic nesciunt animi.",
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
        console.log(
          firstName,
          lastName,
          username,
          skills,
          bio,
          projects,
          profilePicture
        );
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

  useEffect(() => {
    if (router.query.id) setFetchUser(true);
  }, [router.query]);

  if (isLoading) return <Loader />;

  if (isError) return null;

  return (
    <UserContext.Provider value={{ ...state, updateAbout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
