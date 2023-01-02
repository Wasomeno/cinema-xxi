import { Cinema } from "@/components/Icons/Cinema";
import { House } from "@/components/Icons/House";
import Time from "@/components/Icons/TIme";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const getClass = (route) => {
  const [active, setActive] = useState("admin");
  const { pathname: path } = useRouter();

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActive(!basePath ? "admin" : basePath);
  }, [path]);

  return active === route
    ? "p-3 h-2/6 flex items-center rounded-md transition duration-300 ease-in-out bg-slate-400"
    : "p-3 h-2/6 flex items-center transition duration-300 ease-in-out";
};

const AdminNavMobile = () => {
  return (
    <div className="h-16 w-11/12 bg-slate-300 rounded-full shadow-md fixed bottom-2 left-1/2 -translate-x-1/2">
      <div className="flex h-full w-full items-center justify-evenly p-2">
        <Link href="/admin" className={getClass("admin")}>
          <House />
        </Link>

        <Link href="/admin/movies" className={getClass("movies")}>
          <Cinema />
        </Link>

        <Link href="/admin/showtimes" className={getClass("showtimes")}>
          <Time />
        </Link>
      </div>
    </div>
  );
};

export default AdminNavMobile;
