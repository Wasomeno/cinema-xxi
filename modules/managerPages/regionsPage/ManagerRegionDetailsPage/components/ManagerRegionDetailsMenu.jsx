import React from "react";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const ManagerRegionDetailsMenu = ({ region }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href={"/manager/region/" + region + "/add/cinema"}
        text="Add new cinema"
        context="add"
      />
    </HeaderMenuModal>
  );
};
