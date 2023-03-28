import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

import House from "@/components/Icons/House";
import RectangeStack from "@/components/Icons/RectangeStack";
import Ticket from "@/components/Icons/Ticket";

const AppNavigationMobile = () => {
  const { pathname, query } = useRouter();
  const currentPath = pathname.split("/")[2];
  return (
    <div className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-evenly bg-slate-300 shadow-md backdrop-blur-md dark:bg-slate-900 md:hidden">
      <Link
        href="/app"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 p-2 transition duration-200"
      >
        <House
          size="5"
          color={
            !currentPath || query.movieId ? "stroke-blue-300" : "stroke-white"
          }
        />
        <p
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider dark:text-white",
              currentPath === undefined && "dark:text-blue-300"
            )
          )}
        >
          Home
        </p>
      </Link>
      <Link
        href="/app/cinemas"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 p-2 transition duration-200"
      >
        <RectangeStack
          size="5"
          color={currentPath === "cinemas" ? "stroke-blue-300" : "stroke-white"}
        />

        <p
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider dark:text-white",
              currentPath === "cinemas" && "dark:text-blue-300"
            )
          )}
        >
          Cinemas
        </p>
      </Link>
      <Link
        href="/app/tickets"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 p-2 transition duration-200"
      >
        <Ticket
          size="5"
          color={currentPath === "tickets" ? "stroke-blue-300" : "stroke-white"}
        />
        <p
          className={twMerge(
            clsx(
              "font-poppins text-xs tracking-wider dark:text-white",
              currentPath === "tickets" && "dark:text-blue-300"
            )
          )}
        >
          Tickets
        </p>
      </Link>
    </div>
  );
};

export default AppNavigationMobile;
