import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Form } from "@/components/form"
import { CenteredModal, ModalHeader } from "@/components/modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys"

export function AddMovieModal() {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [imageURL, setImageURL] = useState("")

  const pathname = usePathname()
  const router = useRouter()

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
    <CenteredModal
      closeModal={() => router.replace(pathname)}
      className="bg-slate-50 px-6 py-4 dark:bg-slate-900 lg:h-4/6 lg:w-2/6"
    >
      <ModalHeader
        title="Add Movie"
        className="mb-4"
        closeModal={() => router.replace(pathname)}
      />
      <Form
        onSubmit={() => {
          addMovie.mutate()
          router.replace(pathname)
        }}
        className="flex w-full flex-1 flex-col justify-between"
      >
        <div className="flex w-full flex-col gap-2">
          <Form.Input
            type="string"
            label="Id"
            value={id}
            onChange={(event) => setId(event?.target.value)}
          />
          <Form.Input
            type="string"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event?.target.value)}
          />
          <Form.Input
            type="string"
            label="Image URL"
            value={imageURL}
            onChange={(event) => setImageURL(event?.target.value)}
          />
        </div>
        <Form.Submit text="Submit" />
      </Form>
    </CenteredModal>
  )
}
