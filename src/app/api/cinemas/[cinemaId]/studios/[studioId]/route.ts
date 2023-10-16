import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { studioId: string } }
) {
  const { studioId } = context.params
  const studioDetails = await prisma.studio.findUnique({
    where: { id: parseInt(studioId) },
    include: { showtime_to_movie: true },
  })
  return NextResponse.json(studioDetails)
}

export async function PATCH(
  request: NextRequest,
  context: { params: { cinemaId: string; studioId: string } }
) {
  const { cinemaId, studioId } = context.params
  const { capacity, studio } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.studio.update({
      where: { id: parseInt(studioId) },
      data: { capacity: parseInt(capacity), studio: parseInt(studio) },
    })
    return NextResponse.json({ message: "Succesfully updated studio" })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
