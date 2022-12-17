import { useRouter } from "next/router";
import React from "react";

const NotValidManager = () => {
  const router = useRouter();
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="">
        <h1 className="font-medium text-lg font-poppins">
          You're not a manager
        </h1>
      </div>
      <div>
        <button
          className="h-8 p-2 bg-slate-900 text-white font-poppins"
          onClick={() => router.push("/app")}
        >
          Back to App
        </button>
      </div>
    </main>
  );
};

export default NotValidManager;
