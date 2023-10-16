import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Cinema } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { HiXMark } from "react-icons/hi2"

import { useSkeleton } from "@/hooks/useSkeleton"

export const CinemaList = () => {
  const searchParams = useSearchParams()
  const allCinema = useQuery<Cinema[]>({
    queryKey: ["cinemaSearch", searchParams.get("search")],
    queryFn: () =>
      fetch("/api/cinemas/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: searchParams.get("search") }),
      }).then((response) => response.json()),
  })

  const skeletons = useSkeleton(
    <div className="h-8 w-full animate-pulse rounded-lg bg-slate-300 dark:bg-slate-700 lg:h-10" />,
    5
  )

  return (
    <div className="mt-2.5 flex w-full flex-col  gap-2 overflow-y-scroll lg:w-3/6">
      {allCinema.isFetching && skeletons.map((skeleton) => skeleton)}
      {!allCinema.isFetching && allCinema.data?.length
        ? allCinema.data?.map((cinema) => (
            <Link
              key={cinema.id}
              href={`/app/cinemas/${cinema.id}`}
              className="w-full rounded-lg border border-slate-300 bg-gray-50 px-4 py-2 font-openSans text-xs font-medium transition duration-300 hover:bg-blue-100 dark:border-slate-800 dark:bg-slate-900 lg:text-sm"
            >
              {cinema.name}
            </Link>
          ))
        : null}
      {!allCinema.isFetching && !allCinema.data?.length ? (
        <div className="flex h-72 flex-col items-center justify-center gap-2 opacity-50">
          <span className="font-poppins text-xs font-medium tracking-wide  lg:text-sm">
            Cinema Not Found
          </span>
          <span>
            <HiXMark size="25" />
          </span>
        </div>
      ) : null}
    </div>
  )
}
