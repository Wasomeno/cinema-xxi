import { AnimatePresence, motion } from "framer-motion";
import useToggle from "hooks/useToggle";
import { signOut, useSession } from "next-auth/react";

import ChevronRight from "@/components/Icons/ChevronRight";
import Power from "@/components/Icons/Power";

import { ManagerNavigationLink } from "./ManagerNavigationLink";

export const ManagerNavigation = () => {
  const { data: sessionData } = useSession();
  const [showNav, toggleShowNav] = useToggle();
  return (
    <motion.div
      initial={{ width: "30px" }}
      animate={{ width: showNav ? "280px" : "70px" }}
      transition={{ ease: "easeInOut", duration: "0.3" }}
      className={
        "fixed top-0 left-0 z-10 hidden h-full bg-slate-100 shadow-md dark:bg-gray-700 md:block"
      }
    >
      <button
        className="top-24 -right-4 z-10 h-7 w-7 items-center justify-center rounded-lg bg-blue-300 text-center shadow-md dark:bg-slate-500 md:absolute md:flex"
        onClick={toggleShowNav}
      >
        <span className={(showNav ? "rotate-180 " : "") + "p-2"}>
          <ChevronRight color="stroke-slate-900" size="4" />
        </span>
      </button>
      <div className="flex h-36 flex-col items-center justify-center gap-2 border-b border-b-gray-400 bg-slate-100 transition duration-300 dark:bg-gray-700">
        <div className="h-12 w-12 rounded-full bg-slate-500 dark:bg-slate-300" />
        <motion.div
          className="flex flex-col items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNav ? 1 : 0, display: "flex" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="text-center font-poppins text-sm font-medium">
            {sessionData.user.name}
          </p>
        </motion.div>
      </div>
      <div className="flex h-5/6 flex-col justify-between">
        <div className="flex h-4/6 flex-col items-center gap-4 overflow-hidden">
          <ManagerNavigationLink href="/manager" icon="house" showNav={showNav}>
            Dashboard
          </ManagerNavigationLink>
          <ManagerNavigationLink
            href="/manager/movies"
            icon="cinema"
            showNav={showNav}
          >
            Manage Movies
          </ManagerNavigationLink>
          <ManagerNavigationLink
            href="/manager/region"
            icon="globe"
            showNav={showNav}
          >
            Manage Region
          </ManagerNavigationLink>
          <ManagerNavigationLink
            href="/manager/actions"
            icon="house"
            showNav={showNav}
          >
            Actions
          </ManagerNavigationLink>
        </div>
        <button
          onClick={() => signOut({ redirect: false })}
          className="flex h-36 items-center justify-center p-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800">
            <Power size="4" color="stroke-slate-50" />
          </span>
          <AnimatePresence>
            {showNav && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.25, ease: "easeInOut" }}
                className="w-3/6 font-poppins text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};
