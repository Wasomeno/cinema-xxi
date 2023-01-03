import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import { Paragraph } from "@/components/shared/Texts";

const AdminManagerMenu = ({ regionId, cinemaId }) => {
  return (
    <AnimatedContainer className="flex flex-col gap-2 justify-center items-center w-40 p-2 bg-slate-200 rounded-md z-20 shadow-md absolute right-16 top-10">
      <Link
        href={"/manager/region/" + regionId + "/" + cinemaId + "/admins/add"}
        className="text-sm flex justify-evenly items-center h-full w-full p-1"
      >
        <div className="w-1/6">
          <Plus size="4" color="grey" />
        </div>
        <div className="w-4/6">
          <Paragraph text="Add Admin" size="xs" />
        </div>
      </Link>
    </AnimatedContainer>
  );
};

export default AdminManagerMenu;
