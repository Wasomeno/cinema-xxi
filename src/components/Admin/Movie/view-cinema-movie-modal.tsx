"use client"

import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { CenteredModal } from "@/components/modal"

export function ViewCinemaMovieModal() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const movieDetails = useQuery<Movie>({
    queryKey: ["movieDetails", params.movieId],
    queryFn: () =>
      fetch(`/api/movies/${params.movieId}`).then((result) => result.json()),
  })

  return (
    <CenteredModal
      title="Movie Details"
      closeModal={() => router.replace(pathname)}
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <h3>{movieDetails.data?.title}</h3>

          <Image
            src={movieDetails.data?.image_url as string}
            alt="movie-image"
            className="rounded-lg shadow-sm"
            width={250}
            height={300}
          />
        </div>
      </div>
    </CenteredModal>
  )
}
