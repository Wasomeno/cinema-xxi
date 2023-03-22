import React from "react";

import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerMoviesMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Manage movies menu</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
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
      </div>
    </HeaderMenuModal>
  );
};

export default ManagerMoviesMenu;
