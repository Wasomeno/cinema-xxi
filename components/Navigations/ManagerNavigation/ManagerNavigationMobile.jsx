import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import UserMenuModal from "@/components/UserMenuModal";

import { ManagerNavigationLink } from "./ManagerNavigationLink";

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
      <div className="sticky bottom-0 z-10 flex w-full items-center justify-center bg-slate-200">
        <ManagerNavigationLink
          activeRoute={activeRoute}
          route="manager"
          text="Dashboard"
          icon="house"
        />
        <ManagerNavigationLink
          activeRoute={activeRoute}
          route="movies"
          text="Movies"
          icon="cinema"
        />
        <ManagerNavigationLink
          activeRoute={activeRoute}
          route="region"
          text="Regions"
          icon="globe"
        />
        <button
          onClick={toggleShowManagerMenuModal}
          className="flex w-20 flex-col items-center justify-center gap-2"
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
