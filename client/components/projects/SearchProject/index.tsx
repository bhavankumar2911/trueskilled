import React from "react";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import { FaSearch } from "react-icons/fa";

const SearchProject = () => {
  return (
    <section>
      <form className="mx-auto sm:w-3/4 sm:mt-10">
        <h2 className="text-secondary text-xl font-semibold sm:text-2xl">
          Search for a project
        </h2>
        <div className="flex justify-center items-stretch h-[40px] mt-5">
          <Input
            type="text"
            placeholder="Search using keywords"
            className="h-full rounded-tr-none rounded-br-none w-full hover:border-r-0 pl-4"
          />
          <Button className="rounded-tl-none rounded-bl-none drop-shadow-none">
            <FaSearch />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchProject;
