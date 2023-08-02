import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import { WalletNotConnected } from "@/components/WalletNotConnected";

import { CinemaList } from "./CinemaList";

export const CinemaSearch = () => {
  const [search, setSearch] = useState("");

  const { isConnected } = useUserConnectionDetails();

  if (!isConnected) return <WalletNotConnected />;
  return (
    <AnimatedContainer className="flex flex-1 flex-col items-start gap-4 bg-white p-5 dark:bg-slate-800 lg:p-10">
      <div className="w-full">
        <div className="mb-4 space-y-1.5 text-start">
          <h1 className="font-poppins text-base lg:text-3xl">Search Cinemas</h1>
          <p className="text-xs lg:text-base">
            Search for cinema of your choosing
          </p>
        </div>
        <div className="flex w-full flex-col gap-4">
          <input
            type="text"
            onChange={(event) => {
              setTimeout(() => setSearch(event.target.value), 1000);
            }}
            className="w-full rounded-lg border bg-slate-100 p-2 text-xs focus:outline-none dark:bg-slate-600 lg:text-base"
            placeholder="Search cinema..."
          />
          <CinemaList search={search} />
        </div>
      </div>
    </AnimatedContainer>
  );
};
