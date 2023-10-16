import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const cinema = await prisma.cinema.findUnique({
    where: { id: parseInt(cinemaId) },
    select: { cinema_movie: { select: { movies: true } } },
  })
  const movies = cinema?.cinema_movie ? cinema.cinema_movie.movies : []
  return NextResponse.json(movies)
}

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { movieIds } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    const isCinemaMovieExists = await prisma.cinemaMovie.findUnique({
      where: { cinema_id: parseInt(cinemaId) },
    })
    if (!isCinemaMovieExists) {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          cinema_movie: {
            connectOrCreate: {
              where: { cinema_id: parseInt(cinemaId) },
              create: { movies: { connect: movieIds } },
            },
          },
        },
      })
    } else {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          cinema_movie: {
            update: {
              movies: { connect: movieIds },
            },
          },
        },
      })
    }
    return NextResponse.json({
      message: "Successfully added new movies",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
