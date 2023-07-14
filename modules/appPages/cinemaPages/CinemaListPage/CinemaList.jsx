import { useQuery } from "@tanstack/react-query";
import { useSkeleton } from "hooks/useSkeleton";
import Link from "next/link";
import React from "react";
import { HiXMark } from "react-icons/hi2";

export const CinemaList = ({ search }) => {
  const allCinema = useQuery({
    queryKey: ["cinemaSearch", search],
    queryFn: async () => {
      return await fetch("/api/cinemas/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: search }),
      }).then((response) => response.json());
    },
  });

  const skeletons = useSkeleton(
    <div className="h-8 w-full animate-pulse rounded-lg bg-slate-200 lg:h-10" />,
    5
  );

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-scroll lg:w-3/6">
      {allCinema.isLoading && skeletons.map((skeleton) => skeleton)}

      {!allCinema.isLoading && allCinema.data?.length
        ? allCinema.data?.map((cinema) => (
            <Link
              key={cinema.id}
              href={`/app/cinemas/${cinema.id}`}
              className="w-full rounded-lg border border-slate-300 bg-gray-50 p-2 font-poppins text-xs tracking-wider transition duration-300 hover:bg-blue-100 lg:text-sm"
            >
              {cinema.name}
            </Link>
          ))
        : null}

      {!allCinema.isLoading && !allCinema.data?.length ? (
        <div className="flex h-72 flex-col items-center justify-center gap-2">
          <span className="font-poppins text-xs font-medium tracking-wide text-slate-800 text-opacity-50 lg:text-sm">
            Cinema Not Found
          </span>
          <span>
            <HiXMark size="30" className="text-slate-800 text-opacity-50" />
          </span>
        </div>
      ) : null}
    </div>
  );
};
