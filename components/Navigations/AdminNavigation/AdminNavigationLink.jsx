import Link from "next/link";
import React from "react";

import { Cinema } from "@/components/Icons/Cinema";
import { House } from "@/components/Icons/House";
import Time from "@/components/Icons/Time";

const icons = {
  cinema: Cinema,
  house: House,
  time: Time,
};

export const AdminNavigationLink = ({ href, children, icon }) => {
  const Icon = icons[icon];
  return (
    <Link
      href={href}
      className="flex h-16 w-full items-center justify-evenly p-2 transition duration-300 ease-in-out hover:bg-slate-300"
    >
      <span className="w-1/6">
        <Icon />
      </span>
      <span className="w-3/6 text-center">
        <p className="font-poppins text-sm">{children}</p>
      </span>
    </Link>
  );
};
