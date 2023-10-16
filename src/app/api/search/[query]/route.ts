import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { query: string } }
) {
  const { query } = context.params
  const cinemaResult = await prisma.cinema.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
  })

  const movieResult = prisma.movie.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
  })

  const result = await Promise.all([cinemaResult, movieResult])

  return NextResponse.json({ cinemas: result[0], movies: result[1] })
}
