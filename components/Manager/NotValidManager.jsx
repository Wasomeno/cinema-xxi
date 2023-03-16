import { useRouter } from "next/router";
import React from "react";

const NotValidManager = () => {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="font-poppins text-lg font-medium">
          You&lsquo;re not a manager
        </h1>
      </div>

      <button
        className="rounded-md bg-slate-900 p-2 px-4 font-poppins text-sm text-white"
        onClick={() => router.push("/app")}
      >
        Back to App
      </button>
    </main>
  );
};

export default NotValidManager;
