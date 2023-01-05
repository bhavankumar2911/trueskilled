import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import User from "../../interfaces/User";
import reducer from "./reducer";

export interface IState {
  loggedIn: boolean;
  user: null | User;
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

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState);
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
