import React from "react";

import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerMoviesManagerMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/manager/movies/add"
        text="Add new movies"
        context="add"
      />
      <button
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
        className="flex h-full w-full items-center justify-evenly p-1 text-sm"
      >
        <span className="w-1/6">
          <XMark size="4" />
        </span>
        <span className="w-4/6 text-center">
          <p className="font-poppins text-xs">Delete Movies</p>
        </span>
      </button>
    </HeaderMenuModal>
  );
};

export default ManagerMoviesManagerMenu;
