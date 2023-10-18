import axios from "axios"

import { prisma } from "@/lib/prisma"
import { AnimatePresenceClient } from "@/components/animate-presence-client"
import { AnimatedContainer } from "@/components/animated-container"
import {
  AvailableCinema,
  Cinema,
  Showtime,
} from "@/components/App/Movie/available-cinema"
import { Dates } from "@/components/App/Movie/date"
import { Movie } from "@/components/App/Movie/movies"
import SeatsModal from "@/components/App/Movie/seats-modal"
import TicketConfirmationModal from "@/components/App/Movie/ticket-confirmation-modal"

type AppMovieShowtimesPageProps = {
  params: { movieId: string; regionId: string }
  searchParams: { seats: string; confirmation: string }
}

export async function generateMetadata({ params }: AppMovieShowtimesPageProps) {
  const movie = await getMovieDetails(params.movieId)
  const region = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
  })

  return {
    title: `${movie.data.title} Showtimes in ${region?.name}`,
  }
}

async function getMovieDetails(id: string) {
  const details = await axios.get<{
    image: string
    title: string
    plot: string
  }>(`https://imdb-api.projects.thetuhin.com/title/${id}`)
  return details
}

async function getAvailableCinema(regionId: string, movieId: string) {
  const cinemas = await prisma.cinema.findMany({
    where: {
      regionId: parseInt(regionId),
      cinema_movie: { movies: { some: { id: movieId } } },
      studios: {
        some: { showtime_to_movie: { some: { movie_id: movieId } } },
      },
    },
    include: {
      studios: {
        where: { showtime_to_movie: { some: { movie_id: movieId } } },
        include: {
          showtime_to_movie: {
            include: {
              showtime: true,
              movie: true,
              studio: { include: { cinema: true } },
            },
          },
        },
      },
    },
  })
  return cinemas.flatMap((cinema) => ({
    ...cinema,
    studios: cinema.studios.flatMap((studio) => ({
      ...studio,
      showtime_to_movie: studio.showtime_to_movie.filter(
        (showtime) => showtime.movie_id === movieId
      ),
    })),
  }))
}

export default async function AppMovieShowtimesPage({
  params,
  searchParams,
}: AppMovieShowtimesPageProps) {
  const movieDetails = await getMovieDetails(params.movieId)
  const cinemas = await getAvailableCinema(params.regionId, params.movieId)

  return (
    <AnimatedContainer className="flex w-full flex-1 flex-col items-center gap-6 p-4">
      <Movie
        image={<Movie.Image image={movieDetails.data.image} />}
        title={<Movie.Title title={movieDetails.data.title} />}
        plot={<Movie.Plot plot={movieDetails.data.plot} />}
      />
      <Dates />
      <AvailableCinema>
        {cinemas.map((cinema) => (
          <Cinema key={cinema.id} cinema={cinema}>
            {cinema.studios.map((studio) =>
              studio.showtime_to_movie.map((studioShowtime) => (
                <Showtime key={studioShowtime.id} showtime={studioShowtime} />
              ))
            )}
          </Cinema>
        ))}
      </AvailableCinema>
      <AnimatePresenceClient>
        {searchParams.seats && <SeatsModal />}
        {searchParams.confirmation && <TicketConfirmationModal />}
      </AnimatePresenceClient>
    </AnimatedContainer>
  )
}
