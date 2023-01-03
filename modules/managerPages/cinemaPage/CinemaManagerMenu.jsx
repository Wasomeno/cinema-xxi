import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";

export const CinemaManagerMenu = ({ region, cinemaId }) => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center h-16 w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <Link
        href={"/manager/region/" + region + "/" + cinemaId + "/showtimes/add"}
        className="text-sm flex justify-evenly items-center h-full w-full"
      >
        <Plus />
        Add Show Times
      </Link>
    </AnimatedContainer>
  );
};
