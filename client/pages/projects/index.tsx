import React from "react";
import SearchProject from "../../components/projects/SearchProject";
import Button from "../../components/utils/Button";
import Navbar from "../../components/utils/Navbar";
import ProjectList from "../../components/utils/ProjectList";
import Wrapper from "../../components/utils/Wrapper";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Footer from "../../components/utils/Footer";

export interface Project {
  title: string;
  thumbnail: string;
  id: string;
  upvotes: number;
  comments: string[];
}

interface State {
  projects: Project[];
}

const state: State = {
  projects: [
    {
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
      upvotes: 23,
      comments: ["1", "2", "3"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      id: "2",
      upvotes: 90,
      comments: ["1", "2"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
      upvotes: 2,
      comments: ["1", "2", "3", "4"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
      upvotes: 2,
      comments: ["1", "2", "3", "4"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
      upvotes: 23,
      comments: ["1", "2", "3"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      id: "2",
      upvotes: 90,
      comments: ["1", "2"],
    },
  ],
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
