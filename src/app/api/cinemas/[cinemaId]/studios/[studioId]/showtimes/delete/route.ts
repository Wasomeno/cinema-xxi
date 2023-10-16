import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { showtimeIds } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.cinemaId !== cinemaId || !session) {
      return NextResponse.json({ message: "Session Invalid" }), { status: 500 }
    }

    await prisma.showtimeToMovie.deleteMany({
      where: { id: { in: showtimeIds } },
    })

    return NextResponse.json({
      code: 200,
      message: "Successfully removed showtimes",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
