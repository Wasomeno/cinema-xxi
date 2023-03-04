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

export const AdminNavigationLinkMobile = ({
  href,
  children,
  icon,
  activeRoute,
}) => {
  const Icon = icons[icon];
  return (
    <Link
      href={"/admin/" + (href === "admin" ? "" : href)}
      className={
        (activeRoute === href ? "bg-blue-300 " : "") +
        "flex h-16 w-96 flex-col items-center justify-center gap-2 transition duration-300 ease-in-out"
      }
      prefetch={false}
    >
      <span>
        <Icon size="5" />
      </span>
      <span className="text-center">
        <p className="font-poppins text-xs">{children}</p>
      </span>
    </Link>
  );
};
