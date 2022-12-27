import Link from "next/link";
import React from "react";
import AnimatedContainer from "../../AnimatedContainer";
import Plus from "../../Icons/Plus";

const RegionDetailsMenu = () => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center h-16 w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <Link
        href={"/manager/cinema/add"}
        className="text-sm flex justify-evenly items-center h-full w-full"
      >
        <Plus />
        Add new Cinema
      </Link>
    </AnimatedContainer>
  );
};

export default RegionDetailsMenu;
