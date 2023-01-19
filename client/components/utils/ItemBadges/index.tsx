import React, { FC } from "react";

interface Props {
  badges: string[];
  className?: string;
}

const ItemBadges: FC<Props> = ({ badges, className }) => {
  return (
    <ul
      className={`flex flex-wrap gap-2 justify-center ${
        className ? className : ""
      }`}
    >
      {badges.map((badge, index) => (
        <li
          key={index}
          className="bg-green-50 border border-primary text-primary rounded-sm py-1 px-2"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
};

export default ItemBadges;
