import { useState } from "react"
import { useRouter } from "next/router"
import { BiMovie } from "react-icons/bi"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import { query } from "@/components/reactQuery/queries/query"
import { Spinner } from "@/components/Spinner"

export const SearchModal = ({ toggleModal }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchResults = query({
    queryKey: ["search", searchQuery],
    enabledCondition: searchQuery !== "" && searchQuery !== undefined,
    url: `/api/search/${searchQuery}`,
  })

  return (
    <CenteredModalContainer
      title={"Search"}
      closeModal={toggleModal}
      className="h-3/6 lg:h-72 lg:w-5/12"
    >
      <Form
        onSubmit={() => router.push(`/app/search?q=${searchQuery}`)}
        className="mb-2 w-full lg:block"
      >
        <input
          type="text"
          onChange={(event) => {
            setTimeout(() => setSearchQuery(event.target.value), 350)
          }}
          className="w-full rounded-lg border bg-slate-100 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          placeholder="Search for cinemas or movies...."
        />
      </Form>
      {searchQuery.length > 0 && searchResults.isFetching && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      )}
      {!searchResults.isFetching &&
      !searchResults.data?.cinemas.length &&
      !searchResults.data?.movies.length ? (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-sm font-medium text-slate-900 text-opacity-50">
            Results Not Found
          </span>
        </div>
      ) : null}
      {!searchResults.isFetching && searchResults.data?.cinemas.length ? (
        <div className="flex flex-col gap-2">
          {searchResults.data?.cinemas.map((result) => (
            <button
              key={result.index}
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
      {!searchResults.isFetching && searchResults.data?.movies.length ? (
        <div className="flex flex-col gap-2">
          {searchResults.data?.movies.map((result) => (
            <button
              key={result.index}
              onClick={() => {
                toggleModal()
                router.push(`/app/cinemas/${result.id}`)
              }}
              className="flex items-center gap-4 rounded-md p-2 text-left font-openSans text-sm transition hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <BiMovie className="text-slate-400 dark:text-slate-400" />
              {result.title}
            </button>
          ))}
        </div>
      ) : null}
    </CenteredModalContainer>
  )
}
