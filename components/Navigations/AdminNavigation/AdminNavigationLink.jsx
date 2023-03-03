import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { Cinema } from "@/components/Icons/Cinema";
import { House } from "@/components/Icons/House";
import RectangeStack from "@/components/Icons/RectangeStack";
import Time from "@/components/Icons/Time";

const icons = {
  cinema: Cinema,
  house: House,
  time: Time,
  stacks: RectangeStack,
};

export const AdminNavigationLink = ({ href, children, icon, showNav }) => {
  const Icon = icons[icon];
  return (
    <Link
      href={href}
      className="flex h-16 w-full items-center justify-center p-2 transition duration-300 ease-in-out hover:bg-slate-300"
    >
      <motion.span
        initial={{ width: "100%" }}
        animate={{ width: showNav ? "16.666667%" : "100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={"flex justify-center"}
      >
        <Icon size="5" />
      </motion.span>
      <AnimatePresence>
        {showNav && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.25, ease: "easeInOut" }}
            className="w-3/6 text-center"
          >
            <p className="font-poppins text-sm">{children}</p>
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};
