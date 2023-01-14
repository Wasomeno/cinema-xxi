import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import React from "react";

const ShowtimesInStudioMenu = ({ studio }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        context="add"
        href={"/admin/studios/" + studio + "/showtimes/add"}
        text="Add Showtimes"
      />
    </HeaderMenuModal>
  );
};

export default ShowtimesInStudioMenu;
