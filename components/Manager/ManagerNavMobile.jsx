import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Cinema } from "../Icons/Cinema";
import { Globe } from "../Icons/Globe";
import { House } from "../Icons/House";

const activeClass = {
  true: "p-2 h-10 w-10 rounded-full transition duration-300 ease-in-out bg-blue-300",
  false: "p-2 h-10 w-10 rounded-full transition duration-300 ease-in-out",
};

const ManagerNavMobile = () => {
  const [active, setActive] = useState("manager");
  const { pathname: path } = useRouter();

  const getClass = (route) => {
    return activeClass[active === route];
  };

  useEffect(() => {
    const basePath = path.split("/")[2];
    setActive(!basePath ? "manager" : basePath);
  }, [path]);

  return (
    <div className="h-14 w-full bg-slate-200 rounded-t-3xl drop-shadow-2xlw fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="flex h-full w-full items-center justify-evenly p-2">
        <Link href={"/manager"} className={getClass("managers")}>
          <House size="5" color="black" />
        </Link>

        <Link href={"/manager/movies"} className={getClass("movies")}>
          <Cinema size="5" color="black" />
        </Link>

        <Link href={"/manager/region"} className={getClass("region")}>
          <Globe size="5" color="black" />
        </Link>
      </div>
    </div>
  );
};

export default ManagerNavMobile;
