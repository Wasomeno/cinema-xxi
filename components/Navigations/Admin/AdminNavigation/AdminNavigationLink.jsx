import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export const AdminNavigationLink = ({ href, children, Icon }) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          "hover:dark:bg-blue-6 flex h-16 w-full items-center justify-start overflow-hidden rounded-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:dark:bg-slate-600",
          pathname === href && "bg-blue-100 dark:bg-slate-600"
        )
      )}
    >
      <span className="flex w-[90px] justify-center">
        <Icon size="22" className="text-slate-500 dark:text-slate-300" />
      </span>
      <AnimatePresence>
        <span className="w-5/6 font-openSans text-sm font-medium tracking-wide">
          {children}
        </span>
      </AnimatePresence>
    </Link>
  );
};
