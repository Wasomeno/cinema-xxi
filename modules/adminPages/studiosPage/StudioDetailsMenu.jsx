import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import React from "react";

const StudioDetailsMenu = ({ studio }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        text="Add Studio Showtimes"
        context="add"
        href={"/admin/studios/" + studio + "/showtimes/add"}
      />
      <HeaderMenuLink
        text="Add Studio Movies"
        context="add"
        href={"/admin/studios/" + studio + "/movies/add"}
      />
    </HeaderMenuModal>
  );
};

export default StudioDetailsMenu;
