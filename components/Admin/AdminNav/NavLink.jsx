import { Cinema } from "@/components/Icons/Cinema";
import { House } from "@/components/Icons/House";
import RectangeStack from "@/components/Icons/RectangeStack";
import Time from "@/components/Icons/Time";
import Link from "next/link";
import React from "react";

const NavIcon = ({ icon }) => {
  const icons = {
    house: <House size={5} />,
    cinema: <Cinema size={5} />,
    time: <Time size={5} />,
    rectangleStack: <RectangeStack size={5} />,
  };
  return icons[icon];
};

const NavLink = ({ page, activeLink, icon }) => {
  console.log(page, activeLink);
  return (
    <Link
      href={"/admin/" + page}
      className={
        (activeLink === page && "bg-blue-300") +
        " p-3 h-10 rounded-md flex items-center transition duration-300 ease-in-out"
      }
    >
      <NavIcon icon={icon} />
    </Link>
  );
};

export default NavLink;
