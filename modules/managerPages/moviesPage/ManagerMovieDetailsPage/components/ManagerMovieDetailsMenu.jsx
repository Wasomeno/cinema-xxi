import React from "react";

import XMark from "@/components/Icons/XMark";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerMovieDetailsMenu = ({ toggleModal }) => {
  return (
    <HeaderMenuModal>
      <div className="flex h-full w-full items-center justify-evenly text-sm">
        <div className="w-1/6">
          <XMark color="#D9001D" size="5" />
        </div>
        <div className="w-4/6" onClick={toggleModal}>
          <p className="font-poppins text-xs">Delete</p>
        </div>
      </div>
    </HeaderMenuModal>
  );
};

export default ManagerMovieDetailsMenu;
