import React, { FC } from "react";
import { useAppContext } from "../../../providers/App";
import { useUserContext } from "../../../providers/User";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

const About: FC = () => {
  const { about, username } = useUserContext();
  const { user } = useAppContext();

  const editAccount = user ? (user.username == username ? true : false) : false;

  return (
    <SectionCard editAccount={editAccount}>
      <SectionTitle>About</SectionTitle>
      <p className="text-center">{about}</p>
    </SectionCard>
  );
};

export default About;
