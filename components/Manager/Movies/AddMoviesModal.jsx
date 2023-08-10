import { useState } from "react"

import { Form } from "@/components/Forms"
import { CenteredModalContainer } from "@/components/ModalContainer"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys"

export const AddMoviesModal = ({ closeModal }) => {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [imageURL, setImageURL] = useState("")

  const sideEffects = useSideEffects({
    text: "Adding movie",
    queryKeys: movieQueryKeys.allMovies,
  })

  const addMovie = mutation({
    url: "/api/movies",
    body: {
      id,
      title,
      image_url: imageURL,
    },
    method: "POST",
    sideEffects,
  })

  return (
    <CenteredModalContainer
      title="Add Movie"
      closeModal={closeModal}
      className="lg:h-4/6 lg:w-2/6"
    >
      <Form
        onSubmit={() => {
          addMovie.mutate()
          closeModal()
        }}
        className="flex w-full flex-1 flex-col justify-between"
      >
        <div className="flex w-full flex-col gap-2">
          <Form.Input
            type="string"
            labelText="Id"
            value={id}
            setValue={setId}
          />
          <Form.Input
            type="string"
            labelText="Title"
            value={title}
            setValue={setTitle}
          />
          <Form.Input
            type="string"
            labelText="Image URL"
            value={imageURL}
            setValue={setImageURL}
          />
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModalContainer>
  )
}
