import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { AdminNavigationLinkMobile } from "./AdminNavigationLinkMobile";

const AdminNavigationMobile = () => {
  const [activeRoute, setActiveRoute] = useState("admin");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActiveRoute(basePath === undefined ? "admin" : basePath);
    console.log(basePath);
  }, [path]);

  return (
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
      <div className="flex w-80 flex-col items-center justify-center gap-2">
        <span className="h-8 w-8 rounded-full bg-blue-400" />
        <span className="text-center">
          <p className="font-poppins text-xs">Name</p>
        </span>
      </div>
    </div>
  );
};

export default AdminNavigationMobile;
