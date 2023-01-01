import React, { Fragment, useReducer } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../Button";
import FormLabel from "../FormLabel";
import Input from "../Input";
import { Type } from "./Action";
import reducer from "./reducer";

const AddSkill = () => {
  const [state, dispatch] = useReducer(reducer, { skill: "", skills: [] });
  const { CHANGE_SKILL, ADD_SKILL, REMOVE_SKILL } = Type;

  const addSkill: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!!state.skill && !state.skills.includes(state.skill))
      dispatch({ type: ADD_SKILL, payload: state.skill });
    else dispatch({ type: CHANGE_SKILL, payload: "" });
  };

  const removeSkill = (skill: string) => {
    dispatch({ type: REMOVE_SKILL, payload: skill.toLowerCase() });
  };

  return (
    <Fragment>
      <FormLabel className="mb-0">Add your skills</FormLabel>
      <br />
      <small className="text-gray-400 text-xs mb-3 inline-block">
        Hint: Press <span className="font-semibold">add</span> after entering
        each skill
      </small>
      <div className="w-full flex items-start">
        <Input
          type="text"
          className="rounded-tr-none rounded-br-none flex-1 hover:border-r-0"
          value={state.skill}
          onChange={(e) =>
            dispatch({ type: CHANGE_SKILL, payload: e.target.value })
          }
        />
        <Button
          className="border border-green-500 rounded-tl-none rounded-bl-none hover:border-secondary"
          onClick={addSkill}
        >
          Add
        </Button>
      </div>
      <ul className="flex flex-wrap mb-5">
        {state.skills.map((skill, index) => (
          <li
            key={index}
            className="bg-green-100 text-primary mx-1 px-3 py-1 rounded-sm flex items-center justify-between mb-2"
          >
            <span className="mb-1">{skill}</span>
            <span
              className="ml-1 cursor-pointer"
              onClick={() => removeSkill(skill)}
            >
              <IoCloseOutline />
            </span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default AddSkill;
