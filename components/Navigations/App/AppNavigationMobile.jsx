import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineRectangleStack, HiOutlineTicket } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const AppNavigationMobile = () => {
  const { pathname, query } = useRouter();
  const currentPath = pathname.split("/")[2];
  return (
    <div className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-evenly border-t bg-slate-50 shadow-md backdrop-blur-md dark:bg-slate-600 md:hidden">
      <Link
        href="/app"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 transition duration-200"
      >
        <HiOutlineHome
          size="18"
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              !currentPath || query.movieId
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        />
        <span
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              !currentPath || query.movieId
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        >
          Home
        </span>
      </Link>
      <Link
        href="/app/cinemas"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 transition duration-200"
      >
        <HiOutlineRectangleStack
          size="18"
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              currentPath === "cinemas"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        />
        <span
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              currentPath === "cinemas"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        >
          Cinemas
        </span>
      </Link>
      <Link
        href="/app/tickets"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 transition duration-200"
      >
        <HiOutlineTicket
          size="18"
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              currentPath === "transactions"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        />
        <span
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider",
              currentPath === "transactions"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-400 dark:text-slate-50"
            )
          )}
        >
          Transactions
        </span>
      </Link>
    </div>
  );
};

export default AppNavigationMobile;
