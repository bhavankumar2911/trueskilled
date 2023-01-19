import React, { useReducer } from "react";
import SingleProject from "../../components/project/SingleProject";
import About from "../../components/user/About";
import Info from "../../components/user/Info";
import Navbar from "../../components/utils/Navbar";
import Wrapper from "../../components/utils/Wrapper";
import Project from "../../interfaces/Project";

interface Action {
  type: "";
  payload: unknown;
}

const initialState: Project = {
  title:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestiae",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestiae dolores tenetur? Tempora omnis, voluptas suscipit ullam quas exercitationem aspernatur, dolorum praesentium architecto est accusamus esse tempore recusandae modi odit rem consequatur! Nulla enim quia non libero esse, incidunt aspernatur!",
  tags: ["data science", "python", "sklearn", "numpy", "pytorch"],
  demoVideo: "",
  repositoryLink: "",
  previewLink: "",
  thumbnail:
    "https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const reducer = (state: Project, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return { ...state };
  }
};

const Project = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <Wrapper className="!pt-5">
        <div className="sm:grid sm:grid-cols-2 sm:gap-10 md-lg:grid-cols-3">
          <div className="sm:col-span-1 md-lg:col-span-1 hidden sm:block">
            <Info />
            <About />
          </div>

          <div className="sm:col-span-1 md-lg:col-span-2 sm:bg-white rounded-sm sm:p-10 sm:shadow-gray-400/50 sm:shadow-2xl">
            <SingleProject project={{ ...state }} />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Project;
