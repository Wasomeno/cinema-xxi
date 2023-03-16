import Link from "next/link";
import React from "react";

import { iconMap } from "../Icons/iconMap";

const HeaderMenuLink = ({ href, icon, text }) => {
  const LinkIcon = iconMap[icon];
  return (
    <Link
      href={href}
      className="flex h-14 w-5/6 items-center justify-evenly rounded-md bg-slate-50 p-1 shadow-md"
      prefetch={false}
    >
      <div className="w-1/6">
        <LinkIcon size="5" color="stroke-black" />
      </div>
      <div className="w-4/6 text-center">
        <p className="font-poppins text-xs lg:text-sm">{text}</p>
      </div>
    </Link>
  );
};

export default HeaderMenuLink;
