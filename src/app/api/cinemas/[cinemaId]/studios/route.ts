import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(context: { params: { cinemaId: string } }) {
  const { cinemaId } = context.params
  const cinema = await prisma.cinema.findUnique({
    where: { id: parseInt(cinemaId) },
    select: {
      studios: {
        orderBy: { id: "asc" },
        include: {
          showtime_to_movie: { include: { movie: true, showtime: true } },
        },
      },
    },
  })
  return NextResponse.json(cinema.studios)
}

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { studioCapacity, studioNumber } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinemaId !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.cinema.update({
      where: { id: parseInt(cinemaId) },
      data: {
        studios: {
          create: {
            capacity: parseInt(studioCapacity),
            studio: parseInt(studioNumber),
          },
        },
      },
    })
    return NextResponse.json({
      message: `Succesfully added studio ${studioNumber}`,
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
