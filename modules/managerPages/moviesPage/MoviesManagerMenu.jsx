import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";

const MoviesManagerMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/manager/movies/add"
        text="Add new movies"
        context="add"
      />
    </HeaderMenuModal>
  );
};

export default MoviesManagerMenu;
