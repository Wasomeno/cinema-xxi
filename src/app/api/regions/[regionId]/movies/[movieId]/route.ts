import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { regionId: string; movieId: string } }
) {
  const { regionId, movieId } = context.params
  const showtimes = await prisma.region.findUnique({
    where: { id: parseInt(regionId) },
    select: {
      cinemas: {
        include: {
          cinema_movie: {
            where: { id: parseInt(movieId) },
            select: {
              movies: {
                select: {
                  showtime_to_movie: {
                    where: { movie_id: movieId },
                    include: { movie: true, studio: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  const showtimesFlat = showtimes?.cinemas.flatMap((cinema) => ({
    id: cinema.id,
    regionId: cinema.regionId,
    name: cinema.name,
    showtimes: cinema.cinema_movie?.movies.flatMap((movie) =>
      movie.showtime_to_movie.flat()
    ),
  }))
  return NextResponse.json(showtimesFlat)
}
