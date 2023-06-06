import React, { FC, useState } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Avatar from "../../utils/Avatar";
import Modal from "../../utils/Modal";
import EditInfo from "../EditInfo";
import SectionCard from "../SectionCard";
import User from "../../../interfaces/User";

interface Props {
  externalData: boolean;
  user?: User;
}

const InfoCard: FC<Props> = ({ externalData, user: propUser }) => {
  let { firstName, lastName, username, skills, profilePicture } =
    useUserContext();
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  // if data passed as props - other than user profile page
  if (externalData && propUser) {
    firstName = propUser.firstName;
    lastName = propUser.lastName;
    username = propUser.username;
    skills = propUser.skills;
    profilePicture = propUser.profilePicture;
  }

  const editAccount = user ? (user.username == username ? true : false) : false;

  return (
    <SectionCard editAccount={editAccount} setShowModal={setShowModal}>
      <Modal
        title="edit info"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <EditInfo
          firstName={firstName}
          lastName={lastName}
          username={username}
          skills={skills}
          avatar={profilePicture}
        />
      </Modal>
      <Avatar src={profilePicture} />
      <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
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
