import React from "react";

import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerMoviesManagerMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <p className="text-left font-poppins text-xs">Manager movies menu</p>
      <HeaderMenuLink
        href="/manager/movies/add"
        text="Add new movies"
        icon="plus"
      />
      <DeleteModeButton
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
      >
        Delete Movies
      </DeleteModeButton>
    </HeaderMenuModal>
  );
};

export default ManagerMoviesManagerMenu;
