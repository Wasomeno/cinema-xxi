import { prisma } from "lib/prisma"
import { CinemaMovieList } from "modules/appPages/cinemaPages/CinemaMoviesPage"

import AppLayout from "@/components/Layouts/AppLayout"

export async function getStaticPaths() {
  const cinemas = await prisma.cinema.findMany()
  const cinemaPaths = cinemas.map((cinema) => ({
    params: { cinemaId: cinema.id.toString() },
  }))

  return { paths: cinemaPaths, fallback: "blocking" }
}

export async function getStaticProps(context) {
  const { params } = context
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      cinema_movie: {
        select: { movies: true },
      },
    },
  })

  return {
    props: {
      cinemaDetails: {
        ...cinemaDetails,
        movies: cinemaDetails.cinema_movie
          ? cinemaDetails.cinema_movie.movies
          : [],
      },
    },
  }
}

export default function CinemaMoviesPage({ cinemaDetails }) {
  return (
    <AppLayout pageTitle={`${cinemaDetails.name} Movies`}>
      <CinemaMovieList cinemaDetails={cinemaDetails} />
    </AppLayout>
  )
}
