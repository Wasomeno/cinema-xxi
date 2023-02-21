import Link from "next/link";
import React from "react";

const FiveHundred = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <div className="p-2">
        <h1 className="font-inter text-4xl font-semibold tracking-wider lg:text-5xl">
          500
        </h1>
      </div>
      <div className="p-2">
        <p className="font-poppins text-lg tracking-wide">Server Error</p>
      </div>
      <div>
        <Link
          href="/app"
          className="font-poppins rounded-lg bg-slate-800 p-2 px-5 text-white"
        >
          Go to App
        </Link>
      </div>
    </div>
  );
};

export default FiveHundred;
