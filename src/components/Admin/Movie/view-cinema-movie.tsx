import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { TableRowDetailsModal } from "@/components/TableRowDetailsModal"

export function ViewCinemaMovie() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const movieDetails = useQuery<Movie>(["movieDetails", params.movieId], () =>
    fetch(`/api/movies/${params.movieId}`).then((result) => result.json())
  )

  return (
    <TableRowDetailsModal
      title="Movie Details"
      closeModal={() => router.replace(pathname)}
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <h3>{movieDetails.data?.title}</h3>

          <Image
            src={movieDetails.data?.image_url}
            alt="movie-image"
            className="rounded-lg shadow-sm"
            width={250}
            height={300}
          />
        </div>
      </div>
    </TableRowDetailsModal>
  )
}
