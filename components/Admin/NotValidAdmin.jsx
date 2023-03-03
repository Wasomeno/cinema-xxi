import Link from "next/link";
import React from "react";

const NotValidAdmin = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="font-poppins text-lg font-medium lg:text-xl">
        You are not an Admin
      </p>
      <p className="font-poppins text-light text-sm lg:text-base">
        Please go back to the app page.
      </p>
      <Link
        href="/app"
        className="font-poppins w-3/6 rounded-xl bg-slate-100 p-2 text-center text-sm font-medium shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white lg:w-1/6"
      >
        Back to App
      </Link>
    </div>
  );
};

export default NotValidAdmin;
