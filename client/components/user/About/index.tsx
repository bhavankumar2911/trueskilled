import { KeyObject } from "crypto";
import React, { FC, useState } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import Modal from "../../utils/Modal";
import EditAbout from "../EditAbout";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

const About: FC = () => {
  const { about, username } = useUserContext();
  const { user } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const editAccount = user ? (user.username == username ? true : false) : false;

  return (
    <SectionCard editAccount={editAccount} setShowModal={setShowModal}>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Edit About"
      >
        <EditAbout about={about} />
      </Modal>
      <SectionTitle>About</SectionTitle>
      <p className="text-center">{about}</p>
    </SectionCard>
  );
};

export default About;
