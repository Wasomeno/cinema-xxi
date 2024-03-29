"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

import { AvailableMovieList } from "./available-movie-list"

export const AddCinemaMovieModal = () => {
  const [selectedMovies, setSelectedMovies] = useState<string[]>([])
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const sideEffects = useSideEffects({
    text: "Adding Cinema Movies",
    queryKeys: cinemaQueryKeys.cinemaMovies(session.data?.user.cinema?.id),
  })

  const addCinemaMovies = mutation({
    url: `/api/cinemas/${session.data?.user.cinema?.id}/movies`,
    method: "POST",
    body: {
      movieIds: selectedMovies.map((id) => ({ id })),
    },
    sideEffects,
  })

  return (
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-3/6"
    >
      <ModalHeader
        title="Add Movies"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          addCinemaMovies.mutate()
          ;() => router.replace(pathname)
        }}
        className="flex flex-1 flex-col justify-between"
      >
        <AvailableMovieList
          selectedMovies={selectedMovies}
          selectMovie={(movieId) =>
            setSelectedMovies((current) => [...current, movieId])
          }
          deselectMovie={(movieId) =>
            setSelectedMovies((current) =>
              current.filter((selectedMovieId) => selectedMovieId !== movieId)
            )
          }
        />
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}
