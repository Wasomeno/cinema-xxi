import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const AdminNavigationMobileLink = ({
  href,
  children,
  Icon,
  activeRoute,
}) => {
  return (
    <Link
      href={"/admin/" + (href === "admin" ? "" : href)}
      className="flex h-16 flex-col items-center justify-center gap-1.5 transition duration-300 ease-in-out"
      prefetch={false}
    >
      <span>
        <Icon
          className={twMerge(
            "h-4 w-4 text-slate-400 dark:text-slate-50 sm:h-6 sm:w-6",
            activeRoute.includes(href) && "text-blue-500 dark:text-blue-300"
          )}
        />
      </span>
      <span
        className={twMerge(
          "w-24 text-center font-poppins text-xs font-normal tracking-wide text-slate-400 dark:font-light dark:text-slate-50 sm:text-sm",
          activeRoute.includes(href) && "text-blue-500 dark:text-blue-300"
        )}
      >
        {children}
      </span>
    </Link>
  );
};
