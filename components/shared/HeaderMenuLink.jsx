import Link from "next/link";
import React from "react";

import { Cinema } from "../Icons/Cinema";
import Minus from "../Icons/Minus";
import Plus from "../Icons/Plus";

const contextIcons = {
  add: Plus,
  delete: Minus,
  list: Cinema,
};

const HeaderMenuLink = ({ href, context, text }) => {
  const Icon = contextIcons[context];
  return (
    <Link
      href={href}
      className="flex h-full w-full items-center justify-evenly p-1 text-sm"
    >
      <div className="w-1/6">
        <Icon size="4" />
      </div>
      <div className="w-4/6 text-center">
        <p className="font-poppins text-xs">{text}</p>
      </div>
    </Link>
  );
};

export default HeaderMenuLink;
