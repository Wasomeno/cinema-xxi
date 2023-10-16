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
  try {
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    const { studioIds } = await request.json()
    await prisma.studio.deleteMany({
      where: { id: { in: studioIds } },
    })
    return NextResponse.json({
      message: "Successfully deleted studio",
    })
  } catch (error) {
    return NextResponse.json(error)
  }
}
