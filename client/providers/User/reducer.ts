import { State } from ".";

// interface
interface Action {
  type: "";
  payload: unknown;
}

export default (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
