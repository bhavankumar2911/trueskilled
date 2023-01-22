import Image from "next/image";
import React from "react";
import Button from "../../utils/Button";
import Wrapper from "../../utils/Wrapper";
import { FaLongArrowAltRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section>
      <Wrapper className="border-b md:flex md:items-center md:flex-row-reverse">
        <div className="relative w-full h-[250px] md:h-[350px]">
          <Image
            src="/hero.svg"
            alt="hero image"
            className="object-contain drop-shadow-2xl md:translate-x-[8%] md-lg:translate-x-[11%] lg:translate-x-[15%]"
            fill
          />
        </div>
        <div className="text-center mt-7 md:text-left md:m-0">
          <h2 className="text-secondary w-3/4 mx-auto capitalize font-bold text-2xl flex-1 md:w-full md:text-3xl">
            Where skills are valued!
          </h2>
          <p className="text-gray-600 mt-3 max-w-[430px] mx-auto md:max-w-full">
            <b>TrueSkilled</b> values practical knowledge more than
            certifications and educational qualifications. Here at{" "}
            <b>TrueSkilled</b>, you can prove your skills by posting your
            projects.
          </p>
          <Button className="mt-5 !uppercase">
            start posting
            <FaLongArrowAltRight className="translate-y-[1px]" />
          </Button>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
