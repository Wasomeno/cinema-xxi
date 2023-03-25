import { motion } from "framer-motion";
import useToggle from "hooks/useToggle";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import { useToast } from "stores/toastStore";
import { useBalance, useDisconnect } from "wagmi";

import ArrowTopRight from "@/components/Icons/ArrowTopRight";
import ChevronRight from "@/components/Icons/ChevronRight";
import ClipboardDocument from "@/components/Icons/ClipboardDocument";
import Power from "@/components/Icons/Power";

import { ManagerNavigationLink } from "./ManagerNavigationLink";

export const ManagerNavigation = () => {
  const { user } = useUserConnectionDetails();
  const { disconnect } = useDisconnect();
  const [showNav, toggleShowNav] = useToggle();
  const { data: walletBalance } = useBalance({ address: user });
  const [toastSuccess] = useToast();

  function openEtherScan() {
    window
      .open("https://sepolia.etherscan.io/address/" + user, "_blank")
      .focus();
  }

  function copyAddress() {
    navigator.clipboard.writeText(user);
    toastSuccess("Address Copied");
  }

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
          className="flex flex-col items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNav ? 1 : 0, display: "flex" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="text-center font-poppins text-sm font-medium">
            Manager
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-poppins text-sm text-slate-500">
              {user.slice(0, 5)}.....{user.slice(-5, -1) + user.slice(-1)}
            </p>
            <button
              onClick={copyAddress}
              className="rounded-lg bg-slate-700 p-1.5"
            >
              <ClipboardDocument color="stroke-slate-50" size="4" />
            </button>
            <button
              onClick={openEtherScan}
              className="rounded-lg bg-slate-700 p-1.5"
            >
              <ArrowTopRight color="stroke-slate-50" size="4" />
            </button>
          </div>
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
