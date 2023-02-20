import React from "react";
import XMark from "@/components/Icons/XMark";
import { deleteMovie } from "@/components/reactQuery/mutations/Movie/deleteMovie";
import AnimatedContainer from "@/components/AnimatedContainer";
import { AnimatePresence } from "framer-motion";

const ManagerDeleteMovieModal = ({ show, toggleShow, text, movieId }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <AnimatedContainer className="fixed bg-slate-700 bg-opacity-80 w-screen h-screen top-0 left-0 z-20" />
          <AnimatedContainer className="fixed z-25 w-64 h-72 rounded-lg bg-slate-100 shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 p-3">
            <XMark color="red" size="10" />
            <p className="font-poppins font-medium text-lg text-center">
              Delete {text}
            </p>
            <p className="font-poppins text-xs text-center">
              Are you sure you want delete {text}?
            </p>
            <div className="flex w-full justify-center gap-4 items-center">
              <button
                onClick={toggleShow}
                className="w-2/6 h-8 bg-gray-400 font-poppins text-sm rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleShow();
                }}
                className="w-2/6 h-8 bg-red-200 font-poppins text-sm rounded-md"
              >
                Delete
              </button>
            </div>
          </AnimatedContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default ManagerDeleteMovieModal;
