import { IState } from ".";
// interface
interface Action {
  type: "AUTH";
  payload: IState;
}

export default (state: IState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "AUTH":
      return {
        loggedIn: payload.loggedIn,
        user: payload.user,
      };
    default:
      return state;
  }
};
