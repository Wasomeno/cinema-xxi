"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Cinema, Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { BiMovie } from "react-icons/bi"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"

import { CenteredModal, ModalHeader } from "@/components/modal"
import { Spinner } from "@/components/spinner"

type SearchResult = {
  cinemas: Cinema[]
  movies: Movie[]
}

export function SearchModal({ toggleModal }: { toggleModal: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const searchResults = useQuery<SearchResult>(
    ["search", searchQuery],
    () => fetch(`/api/search/${searchQuery}`).then((result) => result.json()),
    {
      enabled: searchQuery !== "",
    }
  )

  const isMovieResults =
    !searchResults.isFetching &&
    (searchResults.data?.movies.length as number) > 0
  const isCinemaResults =
    !searchResults.isFetching &&
    (searchResults.data?.cinemas.length as number) > 0

  useEffect(() => {
    return () => clearTimeout(searchTimeoutRef.current)
  }, [])

  return (
    <CenteredModal
      closeModal={toggleModal}
      className="flex h-5/6 flex-1 flex-col bg-slate-50 p-4 dark:bg-slate-800 lg:h-72 lg:w-5/12 lg:px-6 lg:py-4"
    >
      <ModalHeader title="Search" className="mb-3" closeModal={toggleModal} />
      <div className=" mb-2 w-full lg:block">
        <input
          type="text"
          onChange={(event) => {
            searchTimeoutRef.current = setTimeout(
              () => setSearchQuery(event.target.value),
              750
            )
          }}
          className="w-full rounded-lg border bg-slate-100 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          placeholder="Search for cinemas or movies...."
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
        {searchResults.isFetching ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner />
          </div>
        ) : !isCinemaResults && !isMovieResults ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-xs font-medium opacity-50 lg:text-sm">
              Results Not Found
            </span>
          </div>
        ) : null}
        {isCinemaResults ? (
          <div className="flex flex-1 flex-col gap-2">
            {searchResults.data?.cinemas.map((cinema) => (
              <button
                key={cinema.id}
                onClick={() => {
                  toggleModal()
                  router.push(`/app/cinemas/${cinema.id}`)
                }}
                className="flex items-center gap-4 rounded-md p-2 text-left font-openSans text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <HiOutlineBuildingOffice2 className="text-slate-400 dark:text-slate-400" />
                {cinema.name}
              </button>
            ))}
          </div>
        ) : null}
        {isMovieResults ? (
          <div className="flex flex-col gap-2">
            {searchResults.data?.movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => {
                  toggleModal()
                }}
                className="flex items-center gap-4 rounded-md p-2 text-left font-openSans text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <BiMovie className="text-slate-400 dark:text-slate-400" />
                {movie.title}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </CenteredModal>
  )
}
