import React from "react";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const CinemaStudiosMenu = ({ toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Cinema studios menu</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HeaderMenuLink
          icon="plus"
          href="/admin/studios/add"
          text="Add New Studio"
        />
      </div>
    </HeaderMenuModal>
  );
};
