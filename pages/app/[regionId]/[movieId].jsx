import { useState } from "react"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import { prisma } from "lib/prisma"

import AnimatedContainer from "@/components/AnimatedContainer"
import { AvailableCinema, Cinema } from "@/components/App/Movie/AvailableCinema"
import { Dates } from "@/components/App/Movie/Dates"
import { Movie } from "@/components/App/Movie/Movie"
import SeatsModal from "@/components/App/Movie/SeatsModal"
import TicketConfirmationModal from "@/components/App/Movie/TicketConfirmationModal"
import { TicketContextProvider } from "@/components/App/Movie/TicketContextProvider"
import AppLayout from "@/components/Layouts/AppLayout"

export async function getStaticPaths() {
  const movies = await prisma.movie.findMany()
  const regions = await prisma.region.findMany()

  const regionAndMovieIds = regions.map((region) => {
    const ids = movies.map((movie) => ({
      params: { regionId: region.id.toString(), movieId: movie.id.toString() },
    }))
    return ids
  })

  const flattedIds = regionAndMovieIds.flat()

  return { paths: flattedIds, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
  const movieDetails = await axios.get(
    `https://imdb-api.projects.thetuhin.com/title/${params.movieId}`
  )

  const movieShowtimes = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
    select: {
      cinemas: {
        include: {
          cinema_movie: {
            include: {
              movies: {
                where: { id: params.movieId },
                select: {
                  showtime_to_movie: {
                    where: { movie_id: params.movieId },
                    include: {
                      movie: true,
                      studio: { include: { cinema: true } },
                      showtime: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const movieShowtimesFlat = movieShowtimes.cinemas
    .filter((cinema) => cinema.cinema_movie?.movies.length > 0)
    .flatMap((cinema) => ({
      id: cinema.id,
      regionId: cinema.regionId,
      name: cinema.name,
      showtimes: !cinema.cinema_movie
        ? []
        : cinema.cinema_movie?.movies.flatMap((movie) =>
            movie.showtime_to_movie.map((studioShowtime) => ({
              studioShowtimeId: studioShowtime.id,
              showtime: studioShowtime.showtime,
              cinema: studioShowtime.studio.cinema,
              studio: studioShowtime.studio,
              movie: studioShowtime.movie,
            }))
          ),
    }))

  return {
    props: {
      movieDetails: movieDetails.data,
      movieShowtimes: movieShowtimesFlat,
    },
    revalidate: 30,
  }
}

export default function AppMovieShowtimesPage({
  movieDetails,
  movieShowtimes,
}) {
  const [seatModalOpen, setSeatModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  return (
    <AppLayout title={`${movieDetails.title} | Showtimes`}>
      <TicketContextProvider>
        <AnimatedContainer className="flex w-full flex-1 flex-col items-center gap-6 p-4">
          <Movie
            image={<Movie.Image image={movieDetails.image} />}
            title={<Movie.Title title={movieDetails.title} />}
            plot={<Movie.Plot plot={movieDetails.plot} />}
          />
          <Dates />
          <AvailableCinema>
            {movieShowtimes.map((cinema) => (
              <Cinema key={cinema.id} cinema={cinema}>
                {cinema.showtimes.map((studioShowtime) => (
                  <Cinema.Showtime
                    key={studioShowtime.id}
                    showtime={studioShowtime.showtime}
                    onClick={(setSelectedShowtime) => {
                      setSelectedShowtime(studioShowtime)
                      setSeatModalOpen(true)
                    }}
                  />
                ))}
              </Cinema>
            ))}
          </AvailableCinema>
        </AnimatedContainer>
        <AnimatePresence>
          {seatModalOpen && (
            <SeatsModal
              closeModal={() => setSeatModalOpen(false)}
              seats={<SeatsModal.Seats />}
              seatsTotal={
                <SeatsModal.SeatsTotal
                  onSeatsConfirmation={() => {
                    setSeatModalOpen(false)
                    setConfirmModalOpen(true)
                  }}
                />
              }
            />
          )}
          {confirmModalOpen && (
            <TicketConfirmationModal
              closeModal={() => setConfirmModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </TicketContextProvider>
    </AppLayout>
  )
}
