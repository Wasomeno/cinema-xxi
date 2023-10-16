import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { movieIds } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.movie.deleteMany({ where: { id: { in: movieIds } } })
    return NextResponse.json({
      message: "Successfully Deleted Movies",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
