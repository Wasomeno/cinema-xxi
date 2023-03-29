import { AnimatePresence, motion } from "framer-motion";
import { useIcon } from "hooks/useIcon";
import Link from "next/link";
import { useRouter } from "next/router";

export const AdminNavigationLink = ({
  href,
  children,
  icon,
  showNav,
  setShowNav,
}) => {
  const { push } = useRouter();
  const Icon = useIcon(icon);
  return (
    <button
      onClick={() => {
        push(href);
        setShowNav(false);
      }}
      className="flex h-16 w-full items-center justify-center p-2 transition duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-800"
    >
      <motion.span
        initial={{ width: "100%" }}
        animate={{ width: showNav ? "16.666667%" : "100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={"flex justify-center"}
      >
        <Icon size="5" color="stroke-slate-800 dark:stroke-slate-300" />
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
    </button>
  );
};
