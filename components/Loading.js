import React from "react";
import { useGetLoading } from "../store/stores";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  const [loading, loadingText] = useGetLoading();
  if (!loading) return;
  return (
    <>
      <div className="absolute bg-slate-700 bg-opacity-80 w-screen h-screen" />
      <div className="absolute w-60 h-64 rounded-lg bg-slate-100 shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <p className="m-2 my-4 font-poppins font-medium text-lg">
          {loadingText}
        </p>
        <MoonLoader loading={loading} size={40} color={"black"} />
      </div>
    </>
  );
};

export default Loading;
