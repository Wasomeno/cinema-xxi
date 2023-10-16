import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { studioShowtimeId: string } }
) {
  const { studioShowtimeId } = context.params
  const studioShowtime = await prisma.showtimeToMovie.findUnique({
    where: { id: parseInt(studioShowtimeId) },
    include: { movie: true, showtime: true },
  })
  return NextResponse.json(studioShowtime)
}

export async function PATCH(
  request: NextRequest,
  context: { params: { cinemaId: string; studioShowtimeId: string } }
) {
  const { cinemaId, studioShowtimeId } = context.params
  const { showtimeId, movieId } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.showtimeToMovie.update({
      where: { id: parseInt(studioShowtimeId) },
      data: {
        movie: { connect: { id: movieId } },
        showtime: { connect: { id: parseInt(showtimeId) } },
      },
    })
    return NextResponse.json({
      message: "Successfully updated studio showtime",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
