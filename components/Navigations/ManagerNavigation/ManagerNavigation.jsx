import { motion } from "framer-motion";
import useToggle from "hooks/useToggle";

import ChevronRight from "@/components/Icons/ChevronRight";

import { AdminNavigationLink } from "../AdminNavigation/AdminNavigationLink";

export const ManagerNavigation = () => {
  const [showNav, toggleShowNav] = useToggle();

  return (
    <motion.div
      initial={{ width: "30px" }}
      animate={{ width: showNav ? "280px" : "30px" }}
      transition={{ ease: "easeInOut", duration: "0.3" }}
      className={
        "fixed top-0 left-0 z-10 hidden h-full bg-slate-100 shadow-md md:block"
      }
    >
      <button
        className="top-10 -right-4 hidden h-8 w-8 items-center justify-center rounded-lg bg-blue-300 text-center shadow-md md:absolute md:flex"
        onClick={() => toggleShowNav((current) => !current)}
      >
        <span className={(showNav ? "rotate-180 " : "") + "p-2"}>
          <ChevronRight />
        </span>
      </button>
      <div
        className={
          (showNav ? "flex " : "hidden ") +
          "h-40 flex-col items-center gap-2 border-b border-b-gray-400 bg-slate-100 p-4 transition duration-300"
        }
      >
        <div className="h-16 w-16 rounded-full bg-slate-500" />
        <div className="text-center">
          <p className="font-poppins text-sm font-medium">Name</p>
          <p className="font-poppins text-sm text-slate-500">Address</p>
        </div>
      </div>
      <div
        className={
          (showNav ? "flex " : "hidden ") +
          "flex-col items-center gap-4 overflow-hidden"
        }
      >
        <AdminNavigationLink href="/manager" icon="house">
          Dashboard
        </AdminNavigationLink>
        <AdminNavigationLink href="/manager/movies" icon="cinema">
          Manage Movies
        </AdminNavigationLink>
        <AdminNavigationLink href="/manager/region" icon="time">
          Manage Region
        </AdminNavigationLink>
      </div>
    </motion.div>
  );
};
