import axios, { AxiosError } from "axios";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { useQuery } from "react-query";
import User from "../../interfaces/User";
import reducer from "./reducer";

export interface IState {
  loggedIn: boolean;
  user: null | User;
  setAppUser?: (user: User) => void;
}

const initialAppState: IState = {
  loggedIn: false,
  user: {
    name: "john doe",
    username: "johndoe",
    skills: ["python", "java"],
    projects: [],
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem debitis asperiores modi doloremque sunt voluptatibus illo hic nesciunt animi.",
  },
};

const AppContext = createContext<IState>(initialAppState);

const authenticateUser = () => axios.get("/user/profile");

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState);
  const {} = useQuery("user-auth", authenticateUser, {
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.error.status);
        if (err.response?.data.error.status == 401) {
          dispatch({ type: "AUTH", payload: { loggedIn: false, user: null } });
        }
      }
    },
    onSuccess: (res) => {
      const { user } = res.data;

      dispatch({
        type: "AUTH",
        payload: {
          loggedIn: true,
          user,
        },
      });
    },
  });

  const setAppUser = (user: User) =>
    dispatch({
      type: "AUTH",
      payload: {
        loggedIn: true,
        user,
      },
    });

  return (
    <AppContext.Provider value={{ ...state, setAppUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
