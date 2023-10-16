import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: {
    params: { studioId: string; cinemaId: string }
  }
) {
  const { studioId } = context.params
  const studioShowtimes = await prisma.showtimeToMovie.findMany({
    where: { studio_id: parseInt(studioId) },
    select: { id: true, movie: true, showtime: true },
  })
  return NextResponse.json(
    studioShowtimes.map((showtimeDetails) => ({
      id: showtimeDetails.id,
      movieId: showtimeDetails.movie.id,
      movieTitle: showtimeDetails.movie.title,
      showtimeId: showtimeDetails.showtime.id,
      showtimeHour: showtimeDetails.showtime.hour,
      showtimeMinutes: showtimeDetails.showtime.minutes,
    }))
  )
}
export async function POST(
  request: NextRequest,
  context: { params: { studioId: string; cinemaId: string } }
) {
  const { cinemaId, studioId } = context.params
  const { showtimeId, movieId } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.showtimeToMovie.create({
      data: {
        movie: { connect: { id: movieId } },
        showtime: { connect: { id: parseInt(showtimeId) } },
        studio: { connect: { id: parseInt(studioId) } },
      },
    })
    return NextResponse.json({
      message: "Successfully added new studio showtime",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
