import React, { useReducer } from "react";
import ProjectCard from "../../user/ProjectCard";
import Button from "../../utils/Button";
import { IoIosShareAlt } from "react-icons/io";

interface Project {
  title: string;
  thumbnail: string;
  id: string;
  upvotes: number;
  comments: string[];
}

interface State {
  projects: Project[];
}

interface Action {
  type: "";
  payload: unknown;
}

const initialState: State = {
  projects: [
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
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "1",
      upvotes: 23,
      comments: ["1", "2", "3"],
    },
    {
      thumbnail:
        "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Lorem ipsum dolor sit amet.",
      id: "2",
      upvotes: 2,
      comments: ["1", "2", "3", "4"],
    },
  ],
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return { ...state };
  }
};

const TopProjects = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="mt-7 md:mt-10">
      <h2 className="font-bold text-2xl text-center text-secondary">
        Top Projects
      </h2>
      <ul className="flex justify-center w-full flex-col items-center gap-10 mt-7 sm:flex-row sm:flex-wrap md-lg:items-center md:gap-10 md:mt-10">
        {state.projects.map((project, index) => (
          <ProjectCard
            className="!m-0"
            key={index}
            project={project}
            editProject={false}
          />
        ))}
      </ul>
      <div className="flex justify-center mt-10">
        <Button>
          all projects <IoIosShareAlt />
        </Button>
      </div>
    </section>
  );
};

export default TopProjects;
