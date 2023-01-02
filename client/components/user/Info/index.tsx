import React, { FC } from "react";
import Avatar from "../../utils/Avatar";
import SectionCard from "../SectionCard";
import Props from "./Props";

const InfoCard: FC<Props> = ({ name, username, skills }) => {
  return (
    <SectionCard>
      <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="text-gray-500 text-sm">@{username}</p>
      <ul className="flex flex-wrap gap-2 mt-5 justify-center">
        {skills.map((skill) => (
          <li className="bg-green-50 border border-primary text-primary rounded-sm py-1 px-2">
            {skill}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default InfoCard;
