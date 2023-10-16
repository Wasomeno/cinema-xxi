import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DeleteDataModal } from "@/components/delete-data-modal"
import mutation from "@/components/reactQuery/mutations/mutation"
import { useSideEffects } from "@/components/reactQuery/mutations/useSideEffects"
import { cinemaQueryKeys } from "@/components/reactQuery/queries/queryKeys/cinemaQueryKeys"

export const DeleteCinemaMovieModal = ({
  selectedMovies,
}: {
  selectedMovies: string[]
}) => {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const sideEffects = useSideEffects({
    text: "Deleting Movies",
    queryKeys: cinemaQueryKeys.cinemaMovies(session.data?.user.cinema?.id),
  })

  const deleteCinemaMovies = mutation({
    url: `/api/cinemas/ ${session.data?.user.cinema?.id}/movies/delete`,
    method: "POST",
    body: {
      movieIds: selectedMovies.map((movie) => ({ id: movie })),
    },
    sideEffects,
  })

  return (
    <DeleteDataModal
      title="Delete Cinema Movie"
      description={`Remove ${selectedMovies.length} selected movies?`}
      closeModal={() => router.replace(pathname)}
      deleteFunction={deleteCinemaMovies.mutate}
    />
  )
}
