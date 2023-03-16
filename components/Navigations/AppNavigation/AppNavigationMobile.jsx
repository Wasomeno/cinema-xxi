import Link from "next/link";
import { useRouter } from "next/router";

import House from "@/components/Icons/House";
import RectangeStack from "@/components/Icons/RectangeStack";
import Ticket from "@/components/Icons/Ticket";

const AppNavigationMobile = () => {
  const { pathname } = useRouter();
  const currentPath = pathname.split("/")[2];
  return (
    <div className="sticky bottom-0 z-10 flex h-16 w-full items-center justify-evenly bg-slate-900 md:hidden">
      <Link
        href="/app"
        className="flex h-full w-3/6 flex-col items-center justify-center gap-1 p-2 transition duration-200"
      >
        <House
          size="5"
          color={!currentPath ? "stroke-blue-300" : "stroke-white"}
        />
        <p
          className={
            "font-poppins text-xs font-light tracking-wider" +
            " " +
            (!currentPath ? "text-blue-300" : "text-white")
          }
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
          className={
            "font-poppins text-xs font-light tracking-wider text-white" +
            " " +
            (currentPath === "cinemas" ? "text-blue-300" : "text-white")
          }
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
          className={
            "font-poppins text-xs font-light tracking-wider text-white" +
            " " +
            (currentPath === "tickets" ? "text-blue-300" : "text-white")
          }
        >
          Tickets
        </p>
      </Link>
    </div>
  );
};

export default AppNavigationMobile;
