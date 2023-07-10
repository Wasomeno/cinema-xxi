import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiGlobe } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { MdLocalMovies } from "react-icons/md";

import { ManagerNavigationMobileLink } from "./ManagerNavigationMobileLink";

export const ManagerNavigationMobile = () => {
  const [activeRoute, setActiveRoute] = useState("manager");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActiveRoute(basePath == undefined ? "manager" : basePath);
  }, [path]);

  return (
    <div className="sticky bottom-0 z-10 flex w-full items-center justify-center border-t bg-slate-50 shadow-md shadow-slate-700 backdrop-blur-md dark:bg-slate-700">
      <ManagerNavigationMobileLink
        activeRoute={activeRoute}
        route="manager"
        text="Dashboard"
        Icon={HiHome}
      />
      <ManagerNavigationMobileLink
        activeRoute={activeRoute}
        route="movies"
        text="Movies"
        Icon={MdLocalMovies}
      />
      <ManagerNavigationMobileLink
        activeRoute={activeRoute}
        route="regions"
        text="Regions"
        Icon={HiGlobe}
      />
    </div>
  );
};
