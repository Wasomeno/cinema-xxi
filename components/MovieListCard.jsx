import Link from "next/link";
import React from "react";

const MovieListCard = ({ movieTitle, clickable, onClick }) => {
  return (
    <Link
      href=""
      onClick={clickable && onClick}
      className="flex w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md transition duration-150 hover:scale-105 lg:w-full"
    >
      <div className="w-2/12 text-center lg:w-1/12">
        <p className="font-poppins p-2 text-xs font-medium lg:text-sm">1</p>
      </div>
      <div className="hidden w-3/12 justify-center lg:flex">
        <div className="h-24 w-20 rounded-lg bg-slate-900" />
      </div>
      <div className="w-4/12 text-center lg:w-3/12">
        <p className="font-poppins p-2 text-xs font-medium lg:text-sm">
          {movieTitle}
        </p>
      </div>
      <div className="w-3/12 text-center lg:w-2/12">
        <p className="font-poppins p-2 text-xs font-medium lg:text-sm">
          Added On
        </p>
      </div>
      {/* <div className="flex w-1/12 items-center justify-center">
        <ChevronRight />
      </div> */}
    </Link>
  );
};

export default MovieListCard;
