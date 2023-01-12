import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../Button";
import Input from "../Input";

interface Props {
  skill: string;
  editSkill: (value: string) => void;
  addSkill: (value: string) => void;
  skills: string[];
  removeSkill: (value: string) => void;
}

const SkillSelector: React.FC<Props> = ({
  skill,
  editSkill,
  addSkill,
  skills,
  removeSkill,
}) => {
  return (
    <div>
      <div className="flex items-start">
        <Input
          className="rounded-tr-none rounded-br-none mb-0 w-full"
          value={skill}
          onChange={(e) => editSkill(e.target.value)}
          placeholder="Add your skills here"
        />
        <Button
          className="border border-primary rounded-tl-none rounded-bl-none hover:border-secondary m-0"
          onClick={() => addSkill(skill)}
        >
          Add
        </Button>
      </div>
      <small className="text-gray-400">
        Hint: Press Add after entering each skill
      </small>
      <ul className="flex flex-wrap mb-5 mt-3 gap-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="bg-green-100 text-primary px-3 py-1 rounded-sm flex items-center justify-between"
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
    </div>
  );
};

export default SkillSelector;
