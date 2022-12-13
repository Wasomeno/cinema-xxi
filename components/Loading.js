import React from "react";
import { useLoadingDetails } from "../store/stores";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  const [loading, loadingText] = useLoadingDetails();
  if (!loading) return;
  return (
    <>
      <div className="fixed bg-slate-700 bg-opacity-80 w-screen h-screen top-0 z-20" />
      <div className="fixed w-64 h-72 rounded-lg bg-slate-100 shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 z-30">
        <p className="font-poppins font-medium text-lg text-center">
          {loadingText}
        </p>
        <MoonLoader loading={loading} size={40} color={"black"} />
        <p className="font-poppins text-sm text-center">
          Confirm the transaction in your wallet
        </p>
      </div>
    </>
  );
};

export default Loading;
