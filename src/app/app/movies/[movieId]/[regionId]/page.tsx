import { getAvailableCinemas } from "@/actions/cinema"
import { getMovie } from "@/actions/movie"
import invariant from "tiny-invariant"

import { prisma } from "@/lib/prisma"
import { AnimatePresenceClient } from "@/components/animate-presence-client"
import { AppLayout } from "@/components/app-layout"
import { CinemaCard, Cinemas } from "@/components/App/Movie/cinemas"
import { Dates } from "@/components/App/Movie/date"
import { Movie } from "@/components/App/Movie/movies"
import SeatsModal from "@/components/App/Movie/seats-modal"
import TicketConfirmationModal from "@/components/App/Movie/ticket-confirmation-modal"

type AppMovieShowtimesPageProps = {
  params: { movieId: string; regionId: string }
  searchParams: { seats: string; confirmation: string }
}

export async function generateMetadata({ params }: AppMovieShowtimesPageProps) {
  const movie = await getMovie(params.movieId)
  const region = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
  })

  return {
    title: `${movie?.title} Showtimes in ${region?.name}`,
  }
}

export default async function AppMovieShowtimesPage({
  params,
  searchParams,
}: AppMovieShowtimesPageProps) {
  const movie = await getMovie(params.movieId)
  const cinemas = await getAvailableCinemas(params.regionId, params.movieId)

  invariant(movie)

  return (
    <AppLayout className="flex w-full flex-1 flex-col items-center gap-6 p-4">
      <Movie
        image={<Movie.Image image={movie.image_url} />}
        title={<Movie.Title title={movie.title} />}
      />
      <Dates />
      <Cinemas>
        {cinemas.map((cinema) => (
          <CinemaCard
            key={cinema.id}
            cinema={cinema}
            showtimes={cinema.studios.flatMap((studio) =>
              studio.showtime_to_movie.map((studioShowtime) => studioShowtime)
            )}
          />
        ))}
      </Cinemas>
      <AnimatePresenceClient>
        {searchParams.seats && <SeatsModal />}
        {searchParams.confirmation && <TicketConfirmationModal />}
      </AnimatePresenceClient>
    </AppLayout>
  )
}
