import { State } from ".";

// interface
interface Action {
  type:
    | "FIRSTNAME"
    | "LASTNAME"
    | "USERNAME"
    | "SKILLS"
    | "ABOUT"
    | "PROJECTS"
    | "AVATAR";
  payload: unknown;
}

export default (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "FIRSTNAME":
      return {
        ...state,
        firstName: payload as string,
      };
    case "LASTNAME":
      return {
        ...state,
        lastName: payload as string,
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
