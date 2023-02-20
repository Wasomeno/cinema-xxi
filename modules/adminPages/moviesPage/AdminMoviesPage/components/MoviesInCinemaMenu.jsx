import React from "react";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const MoviesInCinemaMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink href="/admin/movies/add" context="add" text="Add Movie" />
      <HeaderMenuLink
        href="/admin/movies/add"
        context="add"
        text="Delete Movies"
      />
    </HeaderMenuModal>
  );
};

export default MoviesInCinemaMenu;
