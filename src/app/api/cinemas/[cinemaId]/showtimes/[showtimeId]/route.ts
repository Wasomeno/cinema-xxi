import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { showtimeId: string } }
) {
  const { showtimeId } = context.params
  const showtime = await prisma.showtime.findUnique({
    where: { id: parseInt(showtimeId) },
  })
  return NextResponse.json(showtime)
}

export async function PATCH(
  request: NextRequest,
  context: { params: { cinemaId: string; showtimeId: string } }
) {
  const { cinemaId, showtimeId } = context.params
  const { hour, minutes } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.showtime.update({
      where: { id: parseInt(showtimeId) },
      data: { hour: parseInt(hour), minutes: parseInt(minutes) },
    })
    return NextResponse.json({ message: "Succesfully updated showtime" })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
