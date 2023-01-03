import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import React from "react";

const MoviesInCinemaMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink href="/admin/movies/add" context="add" text="Add Movie" />
    </HeaderMenuModal>
  );
};

export default MoviesInCinemaMenu;
