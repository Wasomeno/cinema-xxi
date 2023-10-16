import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { searchTerm } = await request.json()
  async function getCinemas() {
    if (searchTerm === "") {
      const allCinema = await prisma.cinema.findMany()
      return allCinema
    } else {
      const searchedCinema = await prisma.cinema.findMany({
        where: { name: { contains: searchTerm, mode: "insensitive" } },
      })
      return searchedCinema
    }
  }
  const cinemas = await getCinemas()
  return NextResponse.json(cinemas)
}
