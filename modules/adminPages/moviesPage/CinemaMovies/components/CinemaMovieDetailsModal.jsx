import Image from "next/image"

import { query } from "@/components/reactQuery/queries/query"
import { TableRowDetailsModal } from "@/components/TableRowDetailsModal"

export const CinemaMovieDetailsModal = ({ closeModal, movieId }) => {
  const movieDetails = query({
    queryKey: ["movieDetails", movieId],
    url: `/api/movies/${movieId}`,
  })

  return (
    <TableRowDetailsModal title="Movie Details" closeModal={closeModal}>
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
