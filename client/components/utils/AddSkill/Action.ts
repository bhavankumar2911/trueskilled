import State from "./State";

export enum Type {
  CHANGE_SKILL = "CHANGE_SKILL",
  ADD_SKILL = "ADD_SKILL",
  REMOVE_SKILL = "REMOVE_SKILL",
}

export default interface Action {
  type: Type;
  payload: string;
}
