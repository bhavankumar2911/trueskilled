import React, { FC, ReactNode, useContext, useReducer } from "react";
import { createContext } from "react";
import User from "../../interfaces/User";
import reducer from "./reducer";

const initialUserState: User = {
  name: "john doe",
  username: "johndoe",
  skills: ["python", "java"],
  projects: [
    {
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      id: "2",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      id: "1",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      id: "2",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      id: "1",
    },
  ],
  about:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem debitis asperiores modi doloremque sunt voluptatibus illo hic nesciunt animi.",
};

const UserContext = createContext<User>(initialUserState);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
