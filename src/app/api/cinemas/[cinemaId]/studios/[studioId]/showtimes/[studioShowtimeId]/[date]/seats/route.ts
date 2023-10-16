import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: {
    params: { studioShowtimeId: string; date: string }
  }
) {
  let seats
  const { studioShowtimeId, date } = context.params
  const seat = await prisma.seat.findMany({
    where: {
      showTimeToMovieId: parseInt(studioShowtimeId),
      date: parseInt(date),
    },
  })

  const studioDetails = await prisma.showtimeToMovie.findUnique({
    where: { id: parseInt(studioShowtimeId) },
    select: { studio: true },
  })
  if (seat.length !== 0) {
    seats = { ...seat[0], studio: studioDetails?.studio }
  } else {
    seats = { seats_taken: [], studio: studioDetails?.studio }
  }
  console.log(seats)
  return NextResponse.json(seats)
}
