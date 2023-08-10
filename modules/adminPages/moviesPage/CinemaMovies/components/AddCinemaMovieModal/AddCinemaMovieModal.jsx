import { useState } from "react"
import { useSession } from "next-auth/react"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
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
    <CenteredModalContainer title="Add Movies" closeModal={closeModal}>
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
    </CenteredModalContainer>
  )
}
