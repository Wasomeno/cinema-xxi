import Link from "next/link";
import React from "react";
import AnimatedContainer from "../../AnimatedContainer";
import XMark from "../../Icons/XMark";

const MovieDetailsMenu = ({ toggleModal }) => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center h-16 w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <div className="text-sm flex justify-evenly items-center h-full w-full">
        <div className="w-1/6">
          <XMark color="#D9001D" size="5" />
        </div>
        <div className="w-4/6" onClick={toggleModal}>
          <p className="font-poppins text-xs">Delete</p>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default MovieDetailsMenu;
