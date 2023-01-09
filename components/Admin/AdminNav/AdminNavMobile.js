import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";

const AdminNavMobile = () => {
  const [active, setActive] = useState("admin");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActive(basePath === undefined ? "" : basePath);
    console.log(basePath);
  }, [path]);

  return (
    <div className="h-16 w-11/12 bg-slate-300 rounded-full shadow-md fixed bottom-2 left-1/2 -translate-x-1/2">
      <div className="flex h-full items-center justify-evenly p-2">
        <NavLink page="" activeLink={active} icon="house" />
        <NavLink page="showtimes" activeLink={active} icon="time" />
        <NavLink page="movies" activeLink={active} icon="cinema" />
        <NavLink page="studios" activeLink={active} icon="rectangleStack" />
      </div>
    </div>
  );
};

export default AdminNavMobile;
