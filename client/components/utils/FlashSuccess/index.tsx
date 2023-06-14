import React, { FC, useEffect } from "react";

const FlashSuccess: FC<{
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}> = ({ success, setSuccess }) => {
  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  }, []);

  return (
    <div className="bg-green-50 border-green-500 border text-green-500 text-center py-2 fixed top-10 w-1/2 left-1/2 -translate-x-1/2 rounded-sm z-20">
      <span>{success}</span>
    </div>
  );
};

export default FlashSuccess;
