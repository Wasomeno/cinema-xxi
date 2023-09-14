import { useState } from "react"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModal, ModalHeader } from "@/components/Modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

import { AvailableMovieList } from "./AvailableMovieList"

export const AddCinemaMovieModal = ({ closeModal }) => {
  const [selectedMovies, setSelectedMovies] = useState([])

  const session = useSession()
  const sideEffects = useSideEffects({
    text: "Adding Cinema Movies",
    queryKeys: cinemaQueryKeys.cinemaMovies(session.data?.user.cinemaId),
  })

  const addCinemaMovies = mutation({
    url: `/api/cinemas/${session.data?.user.cinemaId}/movies`,
    method: "POST",
    body: {
      movieIds: selectedMovies.map((id) => ({ id })),
    },
    sideEffects,
  })

  return (
    <CenteredModal
      closeModal={closeModal}
      className="h-5/6 bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-3/6"
    >
      <ModalHeader
        title="Add Movies"
        className="mb-4"
        closeModal={closeModal}
      />
      <Form
        onSubmit={() => {
          addCinemaMovies.mutate()
          closeModal()
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
