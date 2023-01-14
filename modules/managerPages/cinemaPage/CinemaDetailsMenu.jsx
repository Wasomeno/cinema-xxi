import Link from "next/link";
import React from "react";
import AnimatedContainer from "@/components/AnimatedContainer";
import Plus from "@/components/Icons/Plus";
import XMark from "@/components/Icons/XMark";
import { Paragraph } from "@/components/shared/Texts";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const CinemaDetailsMenu = ({ toggleShowModal }) => {
  return (
    <HeaderMenuModal>
      <div className="text-sm flex justify-evenly items-center h-full w-full p-1">
        <div className="w-1/6">
          <XMark size="4" color="red" />
        </div>
        <div className="w-4/6" onClick={() => toggleShowModal()}>
          <Paragraph text="Delete" size="xs" />
        </div>
      </div>
      {/* Where to put? cinema details or cinema details > admins
      <Link
        href={""}
        className="text-sm flex justify-evenly items-center h-full w-full p-1"
      >
        <div className="w-1/6">
          <Plus size="4" color="grey" />
        </div>
        <div className="w-4/6">
          <Paragraph text="Add Admin" size="xs" />
        </div>
      </Link> */}
    </HeaderMenuModal>
  );
};
