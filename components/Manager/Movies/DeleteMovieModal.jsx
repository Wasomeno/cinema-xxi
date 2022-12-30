import React from "react";
import XMark from "../../Icons/XMark";
import { deleteMovie } from "../../reactQuery/mutations/Movie/deleteMovie";

const DeleteMovieModal = ({ show, toggleShow, text, movieId }) => {
  const deleteMovieMutation = deleteMovie({ movieId: movieId });
  if (!show) return;
  return (
    <>
      <div className="fixed bg-slate-700 bg-opacity-80 w-screen h-screen top-0 left-0 lef- z-30" />
      <div className="fixed w-64 h-72 rounded-lg bg-slate-100 shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 z-40 p-3">
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
              deleteMovieMutation();
            }}
            className="w-2/6 h-8 bg-red-200 font-poppins text-sm rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default DeleteMovieModal;
