import Link from "next/link";
import React from "react";

import RectangeStack from "@/components/Icons/RectangeStack";

import { House } from "../../Icons/House";
import Ticket from "../../Icons/Ticket";

const AppNavigationMobile = () => {
  return (
    <div className="sticky bottom-0 z-20 flex h-16 w-full items-center justify-evenly bg-slate-900 p-2 md:hidden">
      <Link
        href="/app"
        className="flex w-3/6 flex-col items-center justify-center gap-1 p-2"
      >
        <House size="5" color="white" />
        <p className="font-poppins text-xs font-light tracking-wider text-white">
          Home
        </p>
      </Link>
      <Link
        href="/app/cinemas"
        className="flex w-3/6 flex-col items-center justify-center gap-1 p-2"
      >
        <RectangeStack size="5" color="white" />

        <p className="font-poppins text-xs font-light tracking-wider text-white">
          Cinemas
        </p>
      </Link>
      <Link
        href="/app/tickets"
        className="flex w-3/6 flex-col items-center justify-center gap-1 p-2"
      >
        <Ticket size="5" color="white" />

        <p className="font-poppins text-xs font-light tracking-wider text-white">
          Tickets
        </p>
      </Link>
    </div>
  );
};

export default AppNavigationMobile;
