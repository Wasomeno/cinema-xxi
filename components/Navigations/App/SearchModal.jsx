import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BiMovie } from "react-icons/bi"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
import { query } from "@/components/reactQuery/queries/query"
import { Spinner } from "@/components/Spinner"

export const SearchModal = ({ toggleModal }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchResults = query({
    queryKey: ["search"],
    enabledCondition: searchQuery !== "",
    url: `/api/search/${searchQuery}`,
  })

  const isMovieResults =
    !searchResults.isFetching && searchResults.data?.movies.length > 0
  const isCinemaResults =
    !searchResults.isFetching && searchResults.data?.cinemas.length > 0

  useEffect(() => {
    let searchTimeout
    if (searchQuery !== "") {
      searchTimeout = setTimeout(() => searchResults.refetch(), 500)
    }
    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  return (
    <CenteredModal
      closeModal={toggleModal}
      className="flex h-3/6 flex-1 flex-col bg-slate-50 px-6 py-4 dark:bg-slate-800 lg:h-72 lg:w-5/12"
    >
      <ModalHeader title="Search" className="mb-3" closeModal={toggleModal} />
      <Form
        onSubmit={() => router.push(`/app/search?q=${searchQuery}`)}
        className=" mb-2 w-full lg:block"
      >
        <input
          type="text"
          onChange={(event) => {
            setSearchQuery(event.target.value)
          }}
          className="w-full rounded-lg border bg-slate-100 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          placeholder="Search for cinemas or movies...."
        />
      </Form>
      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
        {searchResults.isFetching ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner />
          </div>
        ) : !isCinemaResults && !isMovieResults ? (
          <div className="flex flex-1 items-center justify-center">
            <span className="text-sm font-medium opacity-50">
              Results Not Found
            </span>
          </div>
        ) : null}
        {isCinemaResults ? (
          <div className="flex flex-1 flex-col gap-2">
            {searchResults.data?.cinemas.map((result, resultIndex) => (
              <button
                key={resultIndex}
                onClick={() => {
                  toggleModal()
                  router.push(`/app/cinemas/${result.id}`)
                }}
                className="flex items-center gap-4 rounded-md p-2 text-left font-openSans text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <HiOutlineBuildingOffice2 className="text-slate-400 dark:text-slate-400" />
                {result.name}
              </button>
            ))}
          </div>
        ) : null}
        {isMovieResults ? (
          <div className="flex flex-col gap-2">
            {searchResults.data?.movies.map((result) => (
              <button
                key={result.index}
                onClick={() => {
                  toggleModal()
                  // router.push(`/app/cinemas/${result.id}`)
                }}
                className="flex items-center gap-4 rounded-md p-2 text-left font-openSans text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <BiMovie className="text-slate-400 dark:text-slate-400" />
                {result.title}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </CenteredModal>
  )
}
