import { motion } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useUserDetails } from "hooks/useUserDetails";
import { useDisconnect } from "wagmi";

import ChevronRight from "@/components/Icons/ChevronRight";
import Power from "@/components/Icons/Power";

import { AdminNavigationLink } from "../../Layouts/AdminLayout/AdminNavigation/AdminNavigationLink";

export const ManagerNavigation = () => {
  const { user } = useUserDetails();
  const { disconnect } = useDisconnect();
  const [showNav, toggleShowNav] = useToggle();

  return (
    <motion.div
      initial={{ width: "30px" }}
      animate={{ width: showNav ? "280px" : "70px" }}
      transition={{ ease: "easeInOut", duration: "0.3" }}
      className={
        "fixed top-0 left-0 z-10 hidden h-full bg-slate-100 shadow-md md:block"
      }
    >
      <button
        className="top-24 -right-4 z-10 h-7 w-7 items-center justify-center rounded-lg bg-blue-300 text-center shadow-md md:absolute md:flex"
        onClick={toggleShowNav}
      >
        <span className={(showNav ? "rotate-180 " : "") + "p-2"}>
          <ChevronRight size="4" />
        </span>
      </button>
      <div
        className={
          "flex h-36 flex-col items-center justify-center gap-2 border-b border-b-gray-400 bg-slate-100 transition duration-300"
        }
      >
        <div className="h-12 w-12 rounded-full bg-slate-500" />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNav ? 1 : 0, display: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="font-poppins text-sm font-medium">Manager</p>
          <p className="font-poppins text-sm text-slate-500">
            {user.slice(0, 5)}.....{user.slice(-5, -1) + user.slice(-1)}
          </p>
        </motion.div>
      </div>
      <div className="flex h-5/6 flex-col justify-between">
        <div className="flex h-4/6 flex-col items-center gap-4 overflow-hidden">
          <AdminNavigationLink href="/manager" icon="house" showNav={showNav}>
            Dashboard
          </AdminNavigationLink>
          <AdminNavigationLink
            href="/manager/movies"
            icon="cinema"
            showNav={showNav}
          >
            Manage Movies
          </AdminNavigationLink>
          <AdminNavigationLink
            href="/manager/region"
            icon="time"
            showNav={showNav}
          >
            Manage Region
          </AdminNavigationLink>
        </div>
        <button
          onClick={disconnect}
          className="flex h-1/6 items-center justify-center p-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-800">
            <Power />
          </span>
          {showNav && <span className="w-3/6">Disconnect</span>}
        </button>
      </div>
    </motion.div>
  );
};
