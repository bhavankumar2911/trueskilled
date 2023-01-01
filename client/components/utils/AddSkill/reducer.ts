import Action, { Type } from "./Action";
import State from "./State";

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  const { CHANGE_SKILL, ADD_SKILL, REMOVE_SKILL } = Type;
  switch (type) {
    case CHANGE_SKILL:
      return {
        ...state,
        skill: payload,
      };

    case ADD_SKILL:
      return {
        skill: "",
        skills: [...state.skills, payload.toLowerCase()],
      };

    case REMOVE_SKILL:
      return {
        ...state,
        skills: [...state.skills.filter((skill) => skill != payload)],
      };

    default:
      return state;
  }
};

export default reducer;
