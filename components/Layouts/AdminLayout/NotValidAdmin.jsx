import Link from "next/link";
import React from "react";

const NotValidAdmin = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 bg-opacity-95 dark:bg-slate-800">
      <p className="font-poppins font-normal lg:text-xl">
        You are not an Admin
      </p>
      <p className="text-light font-poppins text-xs lg:text-base">
        Please go back to the app page.
      </p>
      <Link
        href="/app"
        className="w-3/6 rounded-xl bg-slate-100 p-2 text-center font-poppins text-sm font-medium shadow-md transition duration-300 ease-in-out hover:bg-black hover:text-white dark:bg-slate-700 lg:w-1/6"
      >
        Back to App
      </Link>
    </div>
  );
};

export default NotValidAdmin;
