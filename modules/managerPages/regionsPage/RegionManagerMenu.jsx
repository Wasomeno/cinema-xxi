import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";

export const RegionManagerMenu = () => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center h-16 w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <Link
        href={"/manager/region/add"}
        className="text-sm flex justify-evenly items-center h-full w-full"
      >
        <div className="w-1/6">
          <Plus color="gray" size="4" />
        </div>
        <div className="w-4/6">
          <p className="font-poppins text-xs">Add new region</p>
        </div>
      </Link>
    </AnimatedContainer>
  );
};
