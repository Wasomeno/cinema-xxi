"use server"

import { prisma } from "@/lib/prisma"

export async function getAvailableCinemas(regionId: string, movieId: string) {
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
