import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiGlobe, HiHome } from "react-icons/hi";
import { MdLocalMovies } from "react-icons/md";

import { ManagerNavigationLink } from "./ManagerNavigationLink";

export const ManagerNavigation = () => {
  const [showNav, setShowNav] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  return (
    <div className="sticky left-0 top-0 z-10 rounded-lg border bg-slate-50 dark:border-slate-500 dark:bg-gray-700">
      <div className="flex w-[240px] flex-col justify-start">
        <div className="flex h-3/6 flex-col justify-start gap-3 overflow-hidden p-3">
          <ManagerNavigationLink
            href="/manager"
            Icon={HiHome}
            showNav={showNav}
          >
            Dashboard
          </ManagerNavigationLink>
          <ManagerNavigationLink
            href="/manager/movies"
            Icon={MdLocalMovies}
            showNav={showNav}
          >
            Movies
          </ManagerNavigationLink>
          <ManagerNavigationLink
            href="/manager/regions"
            Icon={HiGlobe}
            showNav={showNav}
          >
            Regions
          </ManagerNavigationLink>
        </div>
      </div>
    </div>
  );
};
