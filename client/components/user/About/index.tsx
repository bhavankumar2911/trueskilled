import React, { FC, useState } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Modal from "../../utils/Modal";
import EditAbout from "../EditAbout";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";
import User from "../../../interfaces/User";

interface Props {
  externalData: boolean;
  user?: User;
}

const About: FC<Props> = ({ externalData, user: propUser }) => {
  let { bio, username } = useUserContext();
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  // if data passed as props - other than user profile page
  if (externalData && propUser) {
    bio = propUser.bio;
    username = propUser.username;
  }

  const editAccount = user ? (user.username == username ? true : false) : false;

  return (
    <SectionCard editAccount={editAccount} setShowModal={setShowModal}>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Edit About"
      >
        <EditAbout about={bio} setShowModal={setShowModal} />
      </Modal>
      <SectionTitle>About</SectionTitle>
      <p className="text-center">{bio}</p>
    </SectionCard>
  );
};

export default About;
