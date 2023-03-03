import { AnimatePresence } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useUserDetails } from "hooks/useUserDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import UserMenuModal from "@/components/UserMenuModal";

import { AdminNavigationLinkMobile } from "./AdminNavigationLinkMobile";

const AdminNavigationMobile = () => {
  const [showAdminMenuModal, toggleShowAdminMenuModal] = useToggle(false);
  const [activeRoute, setActiveRoute] = useState("admin");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActiveRoute(basePath === undefined ? "admin" : basePath);
  }, [path]);

  return (
    <>
      <div className="sticky bottom-0 z-10 flex max-w-screen-lg items-center justify-start overflow-x-scroll bg-slate-100 shadow-md">
        <AdminNavigationLinkMobile
          href="admin"
          icon="house"
          activeRoute={activeRoute}
        >
          Dashboard
        </AdminNavigationLinkMobile>
        <AdminNavigationLinkMobile
          href="movies"
          icon="cinema"
          activeRoute={activeRoute}
        >
          Movies
        </AdminNavigationLinkMobile>
        <AdminNavigationLinkMobile
          href="showtimes"
          icon="time"
          activeRoute={activeRoute}
        >
          Showtimes
        </AdminNavigationLinkMobile>
        <AdminNavigationLinkMobile
          href="studios"
          icon="time"
          activeRoute={activeRoute}
          s
        >
          Studios
        </AdminNavigationLinkMobile>
        <button
          onClick={toggleShowAdminMenuModal}
          className="flex w-80 flex-col items-center justify-center gap-2"
        >
          <span className="h-8 w-8 rounded-full bg-blue-400" />
        </button>
      </div>
      <AnimatePresence>
        {showAdminMenuModal && (
          <UserMenuModal toggleShowUserModal={toggleShowAdminMenuModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavigationMobile;
