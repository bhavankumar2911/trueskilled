import React, { FC, useEffect } from "react";

const Error: FC<{
  error: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, []);

  return (
    <div className="bg-red-50 border-red-500 border text-red-500 text-center py-2 fixed top-10 w-1/2 left-1/2 -translate-x-1/2 rounded-sm z-20">
      <span>{error}</span>
    </div>
  );
};

export default Error;
