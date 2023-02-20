import Link from "next/link";
import React from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import { Paragraph } from "@/components/shared/Texts";

const AdminManagerMenu = ({ regionId, cinemaId }) => {
  return (
    <AnimatedContainer className="absolute right-16 top-10 z-20 flex w-40 flex-col items-center justify-center gap-2 rounded-md bg-slate-200 p-2 shadow-md">
      <Link
        href={"/manager/region/" + regionId + "/" + cinemaId + "/admins/add"}
        className="flex h-full w-full items-center justify-evenly p-1 text-sm"
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
