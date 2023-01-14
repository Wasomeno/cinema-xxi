import React from "react";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";

export const RegionManagerMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/manager/region/add"
        text="Add new region"
        context="add"
      />
    </HeaderMenuModal>
  );
};
