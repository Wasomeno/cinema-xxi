import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import UserMenuModal from "@/components/UserMenuModal";

import { House } from "../../Icons/House";

const NavigationLink = ({ activeRoute, route, text }) => {
  return (
    <Link
      href={"/manager/" + (route === "manager" ? "" : route)}
      className={
        (activeRoute === route ? "bg-blue-200 " : "") +
        "flex h-16 w-4/12 flex-col items-center justify-center gap-2 p-2 transition duration-300 ease-in-out"
      }
      prefetch={false}
    >
      <span>
        <House size="5" color="black" />
      </span>
      <span className="text-center">
        <p className="font-poppins text-xs">{text}</p>
      </span>
    </Link>
  );
};

export const ManagerNavigationMobile = () => {
  const [showManagerMenuModal, toggleShowManagerMenuModal] = useToggle(false);
  const [activeRoute, setActiveRoute] = useState("manager");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActiveRoute(basePath == undefined ? "manager" : basePath);
  }, [path]);

  return (
    <>
      <div className="sticky bottom-0 flex w-full items-center justify-center bg-slate-200">
        <NavigationLink
          activeRoute={activeRoute}
          route="manager"
          text="Dashboard"
        />
        <NavigationLink
          activeRoute={activeRoute}
          route="movies"
          text="Movies"
        />
        <NavigationLink
          activeRoute={activeRoute}
          route="region"
          text="Regions"
        />
        <button
          onClick={toggleShowManagerMenuModal}
          className="flex w-80 flex-col items-center justify-center gap-2"
        >
          <span className="h-8 w-8 rounded-full bg-blue-400" />
        </button>
      </div>
      <AnimatePresence>
        {showManagerMenuModal && (
          <UserMenuModal toggleShowUserModal={toggleShowManagerMenuModal} />
        )}
      </AnimatePresence>
    </>
  );
};
