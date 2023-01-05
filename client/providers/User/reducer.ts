import User from "../../interfaces/User";

// interface
interface Action {
  type: "";
  payload: unknown;
}

export default (state: User, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
