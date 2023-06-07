import React from "react";
import SearchProject from "../../components/projects/SearchProject";
import Button from "../../components/utils/Button";
import Navbar from "../../components/utils/Navbar";
import ProjectList from "../../components/utils/ProjectList";
import Wrapper from "../../components/utils/Wrapper";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Footer from "../../components/utils/Footer";
import Project from "../../interfaces/Project";

interface State {
  projects: Project[];
}

const state: State = {
  projects: [],
};

const Projects = () => {
  return (
    <main>
      <Navbar />
      <Wrapper>
        <SearchProject />
        <div className="mt-12 sm:mt-20">
          <ProjectList projects={state.projects} />
        </div>
        <div className="flex items-center gap-5 justify-center mt-10">
          <Button>
            <AiFillCaretLeft />
          </Button>
          <p>1</p>
          <Button>
            <AiFillCaretRight />
          </Button>
        </div>
      </Wrapper>
      <Footer />
    </main>
  );
};

export default Projects;
