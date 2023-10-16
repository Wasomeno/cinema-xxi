import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const session = await getServerSession(authOptions)
  const { showtimeIds } = await request.json()
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }

    await prisma.showtime.deleteMany({ where: { id: { in: showtimeIds } } })
    return NextResponse.json({
      message: "Succesfully deleted showtimes",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
