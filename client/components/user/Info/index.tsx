import React, { FC, useState } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Avatar from "../../utils/Avatar";
import Modal from "../../utils/Modal";
import EditInfo from "../EditInfo";
import SectionCard from "../SectionCard";

const InfoCard: FC = () => {
  const { name, username, skills, avatar } = useUserContext();
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const editAccount = user ? (user.username == username ? true : false) : false;

  return (
    <SectionCard editAccount={editAccount} setShowModal={setShowModal}>
      <Modal
        title="edit info"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <EditInfo
          name={name}
          username={username}
          skills={skills}
          avatar={avatar}
        />
      </Modal>
      <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="text-gray-500 text-sm">@{username}</p>
      <ul className="flex flex-wrap gap-2 mt-5 justify-center">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="bg-green-50 border border-primary text-primary rounded-sm py-1 px-2"
          >
            {skill}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default InfoCard;
