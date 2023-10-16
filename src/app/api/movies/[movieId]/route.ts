import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { movieId: string } }
) {
  const { movieId } = context.params

  const movieDetails = await prisma.movie.findUnique({
    where: { id: movieId },
  })
  return NextResponse.json(movieDetails)
}

export async function PUT(
  request: NextRequest,
  context: { params: { movieId: string } }
) {
  const { movieId } = context.params
  const { title, image_url } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ status: 500, message: "Session Invalid" })
    }
    await prisma.movie.update({
      where: { id: movieId },
      data: { title, image_url },
    })
    return NextResponse.json({
      code: "200",
      message: "Successfully Updated Movie",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
