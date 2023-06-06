import React, { useEffect, useReducer, useState } from "react";
import SingleProject from "../../components/project/SingleProject";
import About from "../../components/user/About";
import Info from "../../components/user/Info";
import Navbar from "../../components/utils/Navbar";
import Wrapper from "../../components/utils/Wrapper";
import Project from "../../interfaces/Project";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../../components/utils/Loader";
import User from "../../interfaces/User";

interface Action {
  type: "";
  payload: unknown;
}

interface ProjectWithUserData extends Project {
  user: User;
}

const reducer = (state: ProjectWithUserData, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return { ...state };
  }
};

const ProjectWrapper = () => {
  const [project, setProject] = useState<ProjectWithUserData | null>(null);
  const [fetchProject, setFetchProject] = useState(false);
  const router = useRouter();
  const { isLoading } = useQuery(
    "project",
    () => axios.get(`/project/single/${router.query.id}`),
    {
      enabled: fetchProject,
      onSuccess: (res) => {
        console.log("project fetched ==> ", res.data.project);

        setProject({ ...res.data.project });
      },
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    if (router.query.id) setFetchProject(true);
  }, [router.query]);

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <Wrapper className="!pt-5">
        <div className="sm:grid sm:grid-cols-2 sm:gap-10 md-lg:grid-cols-3">
          <div className="sm:col-span-1 md-lg:col-span-1 hidden sm:block">
            <Info externalData={true} user={project?.user} />
            <About externalData={true} user={project?.user} />
          </div>

          <div className="sm:col-span-1 md-lg:col-span-2 sm:bg-white rounded-sm sm:p-10 sm:shadow-gray-400/50 sm:shadow-2xl">
            {isLoading || !project ? (
              <Loader />
            ) : (
              <SingleProject project={{ ...project }} />
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default ProjectWrapper;
