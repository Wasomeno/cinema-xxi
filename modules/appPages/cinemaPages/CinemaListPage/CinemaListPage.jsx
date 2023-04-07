import Link from "next/link";
import { useState } from "react";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { useSearchCinema } from "@/components/reactQuery/queries/Cinema/useSearchCinema";

export const CinemaListPage = () => {
  const [search, setSearch] = useState("");
  const allCinema = useSearchCinema({ searchTerm: search });
  return (
    <AnimatedContainer className="h-screen bg-opacity-95 p-4 dark:bg-slate-800">
      <div className="text-center">
        <h1 className="font-poppins text-sm lg:text-base">List of Cinema</h1>
      </div>
      <div className="my-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          className="w-5/6 rounded-md bg-slate-100 p-2 text-xs focus:outline-none dark:bg-slate-600 md:w-4/6 lg:w-3/6 lg:text-base"
          placeholder="Search cinema"
        />
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-3"
        loading={
          allCinema.isRefetching || allCinema.isLoading || allCinema.isFetching
        }
        object="cinemas"
      >
        {allCinema.data?.length < 1 ? (
          <div className="flex items-center justify-center">
            <p className="font-poppins text-sm">No cinemas found</p>
          </div>
        ) : (
          allCinema.data?.map((cinema) => (
            <Link
              href={"/app/cinemas/" + cinema.id}
              className="flex h-10 w-5/6 items-center justify-center rounded-md bg-gray-100 text-center shadow-md shadow-slate-300 dark:bg-slate-700 md:w-4/6 lg:w-3/6"
              key={cinema.id}
            >
              <p className="font-poppins text-xs lg:text-sm">{cinema.name}</p>
            </Link>
          ))
        )}
      </DataContainer>
    </AnimatedContainer>
  );
};
