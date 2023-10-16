import { usePathname, useRouter } from "next/navigation"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { movieQueryKeys } from "@/components/reactQuery/queries/queryKeys/movieQueryKeys"

export const DeleteMovieModal = ({
  selectedMovies,
}: {
  selectedMovies: string[]
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const sideEffects = useSideEffects({
    text: "Deleting Movies",
    queryKeys: movieQueryKeys.allMovies,
  })

  const deleteMovies = mutation({
    url: "/api/movies/delete",
    method: "POST",
    body: {
      movieIds: selectedMovies,
    },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Movies"
      description={`Continue delete ${selectedMovies.length} selected movies?`}
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteMovies.mutate}
    />
  )
}
