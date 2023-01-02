import Link from "next/link";
import React from "react";
import { Cinema } from "../Icons/Cinema";
import Minus from "../Icons/Minus";
import Plus from "../Icons/Plus";

const contextIcons = {
  add: <Plus size="4" />,
  delete: <Minus size="4" />,
  list: <Cinema size="4" />,
};

const HeaderMenuLink = ({ href, context, text }) => {
  return (
    <Link
      href={href}
      className="text-sm flex justify-evenly items-center h-full w-full"
    >
      <div className="w-1/6">{contextIcons[context]}</div>
      <div className="w-4/6">
        <p className="font-poppins text-xs">{text}</p>
      </div>
    </Link>
  );
};

export default HeaderMenuLink;
