import React from "react";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ShowTimesInCinemaMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/admin/showtimes/add"
        context="add"
        text="Add Showtimes"
      />
    </HeaderMenuModal>
  );
};

export default ShowTimesInCinemaMenu;
