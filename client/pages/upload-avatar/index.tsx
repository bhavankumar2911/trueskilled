import React, { FormEventHandler, useState } from "react";
import Wrapper from "../../components/utils/Wrapper";
import Image from "next/image";
import Avatar from "../../public/avatar.png";
import Button from "../../components/utils/Button";
import { useMutation } from "react-query";
import axios from "axios";
import FormError from "../../components/utils/FormError";
import { useRouter } from "next/router";

const uploadFile = (data: FormData) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return axios.post(`/auth/upload-avatar/${params.get("id")}`, data);
};

const UploadAvatar = () => {
  const router = useRouter();

  const [localFileLink, setLocalFileLink] = useState("");
  // const [emptyError, setEmptyError] = useState("");
  // const [emptyIsError, setEmptyIsError] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { error, isError, mutate } = useMutation(uploadFile, {
    onSuccess: () => router.push(`/login`),
  });

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const tempFile = e.target.files[0];
      setLocalFileLink(URL.createObjectURL(tempFile));
      setFile(tempFile);
    }
  };

  const handleFileUpload: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // send request
    const data = new FormData();
    data.append("avatar", file as File);

    mutate(data);
  };

  return (
    <main className="bg-[#eee] min-h-screen">
      <Wrapper>
        <div className="bg-white inline-block w-full py-10 rounded-sm shadow-gray-400/50 shadow-2xl">
          <div className="w-[250px] mx-auto">
            <h2 className="text-gray-800 font-bold text-3xl mb-10">
              As a last step..
            </h2>
            {/* for backend errors */}
            <FormError isError={isError} error={error as Error} />
            {/* for empty submission(client error) */}
            {/* <p
              className={`opacity-0 transition-all duration-500 ${
                emptyIsError
                  ? "text-red-500 border border-red-500 bg-red-50 p-3 text-center mb-7 opacity-100"
                  : ""
              }`}
            >
              {emptyIsError && emptyError}
            </p> */}

            <h3 className="mb-10">Upload a profile picture</h3>
          </div>

          <form onSubmit={handleFileUpload}>
            {/* placeholder and file choose button */}
            <div className="flex items-center mb-10 justify-center">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
                <Image
                  src={localFileLink ? localFileLink : Avatar}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <input
                name="file"
                type="file"
                className="block text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-100 border border-primary file:text-sm file:font-semibold file:rounded-sm file:cursor-pointer 
      file:border-primary file:text-primary file:bg-transparent w-[105px] ml-10"
                onChange={handleFileSelect}
              />
            </div>

            {/* submit */}
            <div className="max-w-[250px] mx-auto">
              <Button type="submit" block>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Wrapper>
    </main>
  );
};

export default UploadAvatar;
