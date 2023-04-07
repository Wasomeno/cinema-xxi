import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AdminMenuModal from "@/components/AdminMenuModal";

import { AdminNavigationMobileLink } from "./AdminNavigationMobileLink";

export const AdminNavigationMobile = () => {
  const [showUserModal, toggleShowUserModal] = useToggle(false);
  const [activeRoute, setActiveRoute] = useState("admin");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActiveRoute(basePath === undefined ? "admin" : basePath);
  }, [path]);

  return (
    <>
      <div className="sticky bottom-0 z-10 flex w-full items-center justify-start overflow-x-scroll bg-slate-100 shadow-md dark:bg-slate-700">
        <AdminNavigationMobileLink
          href="admin"
          icon="house"
          activeRoute={activeRoute}
        >
          Dashboard
        </AdminNavigationMobileLink>
        <AdminNavigationMobileLink
          href="movies"
          icon="cinema"
          activeRoute={activeRoute}
        >
          Movies
        </AdminNavigationMobileLink>
        <AdminNavigationMobileLink
          href="showtimes"
          icon="time"
          activeRoute={activeRoute}
        >
          Showtimes
        </AdminNavigationMobileLink>
        <AdminNavigationMobileLink
          href="studios"
          icon="rectangleStack"
          activeRoute={activeRoute}
          s
        >
          Studios
        </AdminNavigationMobileLink>
        <button
          onClick={toggleShowUserModal}
          className="flex w-60 flex-col items-center justify-center gap-2"
        >
          <span className="h-8 w-8 rounded-full bg-blue-400" />
        </button>
      </div>
      <AnimatePresence>
        {showUserModal && (
          <AdminMenuModal toggleShowUserModal={toggleShowUserModal} />
        )}
      </AnimatePresence>
    </>
  );
};
