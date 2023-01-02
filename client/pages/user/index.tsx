import React from "react";
import About from "../../components/user/About";
import Info from "../../components/user/Info";
import Projects from "../../components/user/Projects";
import Wrapper from "../../components/utils/Wrapper";

const User = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Wrapper>
        <Info
          name="John Doe"
          username="johndoe"
          skills={[
            "html",
            "css",
            "react.js",
            "next.js",
            "node.js",
            "express.js",
            "typescript",
          ]}
        />

        <About description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime doloribus ex pariatur natus, exercitationem cupiditate facilis nemo! Nulla nobis, illo distinctio possimus mollitia nam culpa ipsa recusandae, dolorum eligendi nemo." />

        <Projects projects={[]} />
      </Wrapper>
    </main>
  );
};

export default User;
