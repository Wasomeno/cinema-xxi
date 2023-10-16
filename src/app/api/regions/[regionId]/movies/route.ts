import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { regionId: string } }
) {
  const { regionId } = context.params
  const region = await prisma.region.findUnique({
    where: { id: parseInt(regionId) },
    select: {
      cinemas: {
        select: {
          cinema_movie: {
            select: {
              movies: {
                include: { _count: { select: { showtime_to_movie: true } } },
              },
            },
          },
        },
      },
    },
  })

  const cinemaMovies = region?.cinemas.filter(
    (cinema) => (cinema?.cinema_movie?.movies.length as number) > 0
  )

  return NextResponse.json(
    !cinemaMovies?.length
      ? []
      : cinemaMovies.flatMap(
          (cinema) =>
            cinema.cinema_movie?.movies.filter(
              (movie) => movie._count.showtime_to_movie > 0
            )
        )
  )
}
