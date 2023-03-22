import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import XMark from "@/components/Icons/XMark";

const ManagerDeleteMovieModal = ({ toggleShow, text }) => {
  return (
    <>
      <AnimatedContainer className="fixed top-0 left-0 z-20 h-screen w-screen bg-slate-700 bg-opacity-80" />
      <AnimatedContainer className="z-25 fixed top-1/2 left-1/2 flex h-72 w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 rounded-lg bg-slate-100 p-3 shadow-md">
        <XMark color="red" size="10" />
        <p className="text-center font-poppins text-lg font-medium">
          Delete {text}
        </p>
        <p className="text-center font-poppins text-xs">
          Are you sure you want delete {text}?
        </p>
        <div className="flex w-full items-center justify-center gap-4">
          <button
            onClick={toggleShow}
            className="h-8 w-2/6 rounded-md bg-gray-400 font-poppins text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toggleShow();
            }}
            className="h-8 w-2/6 rounded-md bg-red-200 font-poppins text-sm"
          >
            Delete
          </button>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default ManagerDeleteMovieModal;
