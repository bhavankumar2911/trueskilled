import React, { FC } from "react";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";

const About: FC<{ about: string }> = ({ about }) => {
  return (
    <SectionCard editAccount>
      <SectionTitle>About</SectionTitle>
      <p className="text-justify">{about}</p>
    </SectionCard>
  );
};

export default About;
