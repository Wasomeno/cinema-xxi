import React from "react";
import { useRouter } from "next/router";
import { House } from "./Icons/House";
import CheckMark from "./Icons/Checkmark";
import Ticket from "./Icons/Ticket";

const AppNav = () => {
  const router = useRouter();
  return (
    <div className="fixed w-full bg-slate-200 h-14 flex items-center justify-evenly bottom-0 z-10">
      <div className="w-3/6 p-3" onClick={() => router.push("/app")}>
        <House size="5" />
      </div>
      <div
        className="flex flex-col items-center w-3/6 p-2"
        onClick={() => router.push("/app/profile")}
      >
        <Ticket size="5" color="black" />
      </div>
    </div>
  );
};

export default AppNav;
