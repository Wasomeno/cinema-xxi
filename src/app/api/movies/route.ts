import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const movies = await prisma.movie.findMany()
  return NextResponse.json(movies)
}

export async function POST(request: NextRequest) {
  const { id, title, image_url } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.movie.create({
      data: { id, title, image_url },
    })
    return NextResponse.json({
      message: "Successfully Added Movie",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
