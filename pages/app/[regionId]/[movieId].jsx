import { useState } from "react"
import axios from "axios"
import { AnimatePresence } from "framer-motion"
import { prisma } from "lib/prisma"

import AnimatedContainer from "@/components/AnimatedContainer"
import MovieDateSection from "@/components/App/Movie/MovieDateSection"
import MovieSection from "@/components/App/Movie/MovieSection"
import MovieShowtimeSection from "@/components/App/Movie/MovieShowtimeSection"
import SeatsModal from "@/components/App/Movie/SeatsModal"
import TicketConfirmationModal from "@/components/App/Movie/TicketConfirmationModal"
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

export async function getStaticProps(context) {
  const { params } = context

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

  const [selectedDate, setSelectedDate] = useState({})
  const [selectedShowtime, setSelectedShowtime] = useState({})
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seatsId, setSeatsId] = useState()

  return (
    <AppLayout pageTitle={`${movieDetails.title} Showtimes`}>
      <AnimatedContainer className="flex w-full flex-1 flex-col items-center gap-6 p-4">
        <MovieSection
          image={<MovieSection.Image image={movieDetails.image} />}
          title={<MovieSection.Title title={movieDetails.title} />}
          plot={<MovieSection.Plot plot={movieDetails.plot} />}
        />
        <MovieDateSection
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <MovieShowtimeSection>
          {movieShowtimes.map((cinema) => (
            <MovieShowtimeSection.CinemaCard key={cinema.id} cinema={cinema}>
              {cinema.showtimes.map((studioShowtime) => (
                <MovieShowtimeSection.ShowtimeCard
                  key={studioShowtime.id}
                  showtime={studioShowtime.showtime}
                  selectedDate={selectedDate}
                  onClick={() => {
                    setSelectedShowtime(studioShowtime)
                    setSeatModalOpen(true)
                  }}
                />
              ))}
            </MovieShowtimeSection.CinemaCard>
          ))}
        </MovieShowtimeSection>
      </AnimatedContainer>
      <AnimatePresence>
        {seatModalOpen && (
          <SeatsModal
            title={`${selectedShowtime.movie.title}`}
            closeModal={() => setSeatModalOpen(false)}
            seats={
              <SeatsModal.Seats
                selectedDate={selectedDate}
                selectedShowtime={selectedShowtime}
                setSelectedSeats={setSelectedSeats}
                selectedSeats={selectedSeats}
                setSeatsId={setSeatsId}
              />
            }
            seatsTotal={
              <SeatsModal.SeatsTotal
                selectedDate={selectedDate}
                selectedSeats={selectedSeats}
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
            selectedDate={selectedDate}
            selectedSeats={selectedSeats}
            selectedShowtime={selectedShowtime}
            seatsId={seatsId}
          />
        )}
      </AnimatePresence>
    </AppLayout>
  )
}
