import Image from "next/image";
import React, { useState } from "react";
import AddSkill from "../../components/utils/AddSkill";
import Button from "../../components/utils/Button";
import FormLabel from "../../components/utils/FormLabel";
import Input from "../../components/utils/Input";
import Wrapper from "../../components/utils/Wrapper";
import Avatar from "../../public/avatar.png";

const CompleteProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <main className="pb-10 sm:grid sm:grid-cols-3 sm:pb-0">
      {/* top */}
      <section className="bg-[url(/auth.jpg)] min-h-[200px] bg-no-repeat bg-center bg-cover relative after:content-[''] after:bg-black after:absolute after:inset-0 after:opacity-80 after:z-10 flex items-center justify-center sm:after:content-none sm:h-screen">
        <h2 className="text-white text-2xl capitalize relative z-20 font-bold sm:hidden xs:text-3xl">
          Complete your profile
        </h2>
      </section>
      {/* bottom */}
      <section className="sm:col-span-2 sm:h-screen sm:flex sm:max-h-screen sm:overflow-y-scroll sm:px-3">
        <Wrapper>
          <form className="md:w-3/4 mx-auto sm:pb-10 max-w-[500px]">
            <h2 className="text-gray-800 hidden sm:block font-bold text-3xl mb-10">
              Complete your profile
            </h2>
            <div className="flex flex-col items-center sm:flex-row">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative">
                <Image
                  src={profilePicture ? profilePicture : Avatar}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mb-4 flex items-center sm:ml-10">
                <FormLabel className="mr-2 mt-1">Profile picture</FormLabel>
                <input
                  type="file"
                  className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent w-[105px]"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
            <FormLabel>Choose a username</FormLabel>
            <Input type="text" block />
            <FormLabel>Describe yourself</FormLabel>
            <Input textarea block />
            <AddSkill />
            <Button block>Save</Button>
          </form>
        </Wrapper>
      </section>
    </main>
  );
};

export default CompleteProfile;
