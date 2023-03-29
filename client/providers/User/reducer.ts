import { State } from ".";

// interface
interface Action {
  type: "NAME" | "USERNAME" | "SKILLS" | "ABOUT" | "PROJECTS" | "AVATAR";
  payload: unknown;
}

export default (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "NAME":
      return {
        ...state,
        name: payload as string,
      };
    case "USERNAME":
      return {
        ...state,
        username: payload as string,
      };
    case "AVATAR":
      return {
        ...state,
        avatar: payload as string,
      };
    case "SKILLS":
      return {
        ...state,
        skills: payload as string[],
      };
    case "ABOUT":
      return {
        ...state,
        about: payload as string,
      };
    case "PROJECTS":
      return {
        ...state,
        projects: payload as unknown[],
      };
    default:
      return state;
  }
};
