import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import ChevronRight from "@/components/Icons/ChevronRight";
import Power from "@/components/Icons/Power";

import { AdminNavigationLink } from "./AdminNavigationLink";

export const AdminNavigation = () => {
  const { data: sessionData } = useSession();
  const [showNav, setShowNav] = useState(false);

  return (
    <motion.div
      initial={{ width: "70px" }}
      animate={{ width: showNav ? "280px" : "70px" }}
      transition={{ ease: "easeInOut", duration: "0.3" }}
      className={
        "fixed top-0 left-0 z-10 hidden h-full bg-slate-100 shadow-md dark:bg-gray-700 md:block"
      }
    >
      <button
        className="top-24 -right-4 z-10 h-7 w-7 items-center justify-center rounded-lg bg-blue-300 text-center shadow-md dark:bg-slate-500 md:absolute md:flex"
        onClick={() => setShowNav(!showNav)}
      >
        <span className={(showNav ? "rotate-180 " : "") + "p-2"}>
          <ChevronRight size="5" color="stroke-slate-800" />
        </span>
      </button>
      <div className="flex h-36 flex-col items-center justify-center gap-2 border-b border-b-gray-400 bg-slate-100 transition duration-300 dark:bg-gray-700">
        <div className="h-12 w-12 rounded-full bg-slate-500 dark:bg-slate-300" />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: showNav ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="w-60 font-poppins text-sm font-medium">
            {sessionData.user.name}
          </p>
          <p className="my-2 w-60 font-poppins text-xs font-medium text-slate-300">
            {showNav && sessionData.user.cinemaName}
          </p>
        </motion.div>
      </div>
      <div className="flex h-5/6 flex-col justify-between">
        <div className="flex h-4/6 flex-col items-center gap-4 overflow-hidden">
          <AdminNavigationLink
            setShowNav={setShowNav}
            href="/admin"
            icon="house"
            showNav={showNav}
          >
            Dashboard
          </AdminNavigationLink>
          <AdminNavigationLink
            setShowNav={setShowNav}
            href="/admin/movies"
            icon="cinema"
            showNav={showNav}
          >
            Manage Movies
          </AdminNavigationLink>
          <AdminNavigationLink
            setShowNav={setShowNav}
            href="/admin/showtimes"
            icon="time"
            showNav={showNav}
          >
            Manage Showtimes
          </AdminNavigationLink>
          <AdminNavigationLink
            setShowNav={setShowNav}
            href="/admin/studios"
            icon="rectangleStack"
            showNav={showNav}
          >
            Manage Studios
          </AdminNavigationLink>
        </div>
        <button
          onClick={() => signOut({ redirect: false })}
          className="flex h-36 items-center justify-center p-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-700 dark:bg-slate-500">
            <Power size="4" color="stroke-slate-50" />
          </span>
          {showNav && (
            <span className="w-3/6 font-poppins text-sm">Logout</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};
