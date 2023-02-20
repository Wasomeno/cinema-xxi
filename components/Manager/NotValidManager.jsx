import { useRouter } from "next/router";
import React from "react";

const NotValidManager = () => {
  const router = useRouter();
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="">
        <h1 className="font-poppins text-lg font-medium">
          You &lsquo re not a manager
        </h1>
      </div>
      <div>
        <button
          className="font-poppins h-8 bg-slate-900 p-2 text-white"
          onClick={() => router.push("/app")}
        >
          Back to App
        </button>
      </div>
    </main>
  );
};

export default NotValidManager;
