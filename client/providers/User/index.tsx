import React, { FC, ReactNode, useContext, useReducer } from "react";
import { createContext } from "react";
import User from "../../interfaces/User";
import reducer from "./reducer";

export interface State extends User {
  avatar: string;
}

const initialUserState: State = {
  name: "john doe",
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
  const [state, dispatch] = useReducer(reducer, initialUserState);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
