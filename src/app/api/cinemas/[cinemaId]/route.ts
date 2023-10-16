import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  requests: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(cinemaId) },
    include: {
      cinema_movie: {
        include: {
          cinema: true,
          movies: { include: { showtime_to_movie: true } },
        },
      },
      region: true,
      studios: true,
      showtimes: true,
      transactions: true,
    },
  })
  return NextResponse.json({
    ...cinemaDetails,
    transactions: cinemaDetails?.transactions.map((transaction) => ({
      ...transaction,
      showtime: transaction.showtime.toString(),
    })),
  })
}

export async function PATCH(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { cinemaName } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.cinema.update({
      where: { id: parseInt(cinemaId) },
      data: { name: cinemaName },
    })
    return NextResponse.json({
      message: "Successfully updated cinema",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
