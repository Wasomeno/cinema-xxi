import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const cinemaShowtimes = await prisma.showtime.findMany({
    where: { cinemaId: parseInt(cinemaId) },
    orderBy: { id: "asc" },
  })
  return NextResponse.json(cinemaShowtimes)
}

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const session = await getServerSession(authOptions)
  try {
    const { hour, minutes } = await request.json()

    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }

    await prisma.showtime.create({
      data: {
        hour: parseInt(hour),
        minutes: parseInt(minutes),
        cinema: { connect: { id: parseInt(cinemaId) } },
      },
    })
    return NextResponse.json({
      message: "Succesfully added new showtime",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
