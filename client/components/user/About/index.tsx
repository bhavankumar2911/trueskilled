import React, { FC } from "react";
import SectionCard from "../SectionCard";
import SectionTitle from "../SectionTitle";
import Props from "./Props";

const About: FC<Props> = ({ description }) => {
  return (
    <SectionCard>
      <SectionTitle>About</SectionTitle>
      <p className="text-justify">{description}</p>
    </SectionCard>
  );
};

export default About;
