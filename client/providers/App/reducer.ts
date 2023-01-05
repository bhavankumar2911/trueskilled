import { IState } from ".";
// interface
interface Action {
  type: "";
  payload: unknown;
}

export default (state: IState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
