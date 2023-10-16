import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { movieIds } = await request.json()

  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinemaId !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.cinema.update({
      where: { id: parseInt(cinemaId) },
      data: {
        cinema_movie: { update: { movies: { disconnect: movieIds } } },
      },
    })
    return NextResponse.json({
      message: "Successfully deleted movies",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
