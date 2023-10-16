import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { cinemaIds } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.cinema.deleteMany({ where: { id: { in: cinemaIds } } })
    return NextResponse.json({
      message: "Successfully deleted cinemas",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
