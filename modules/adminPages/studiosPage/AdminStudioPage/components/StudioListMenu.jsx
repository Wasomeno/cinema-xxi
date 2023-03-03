import React from "react";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const StudioListMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        context="add"
        href="/admin/studios/add"
        text="Add New Studio"
      />
    </HeaderMenuModal>
  );
};
