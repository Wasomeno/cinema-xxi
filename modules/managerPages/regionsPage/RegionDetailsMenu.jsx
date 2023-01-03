import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import { Paragraph } from "@/components/shared/Texts";

export const RegionDetailsMenu = ({ region }) => {
  return (
    <AnimatedContainer className="flex flex-col justify-center items-center h-16 w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <Link
        href={"/manager/region/" + region + "/add/cinema"}
        className=" flex justify-evenly items-center h-full w-full"
      >
        <div className="w-1/6">
          <Plus color="gray" size="5" />
        </div>
        <div className="w-4/6 text-center">
          <Paragraph text="Add Cinema" size="xs" style="medium" />
        </div>
      </Link>
    </AnimatedContainer>
  );
};
