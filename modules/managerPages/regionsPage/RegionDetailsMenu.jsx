import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import { Paragraph } from "@/components/shared/Texts";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";

export const RegionDetailsMenu = ({ region }) => {
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
