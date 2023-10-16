import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const cinemas = await prisma.cinema.findMany()
  return NextResponse.json(cinemas)
}

export async function POST(request: NextRequest) {
  const { cinemaName, studioDetails, regionId } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json(
        {
          message: "Session Invalid",
        },
        { status: 500 }
      )
    }
    await prisma.cinema.create({
      data: {
        name: cinemaName,
        regionId: regionId,
        studios: { createMany: { data: studioDetails } },
      },
    })
    return NextResponse.json({
      code: "200",
      message: `Successfully added ${cinemaName}`,
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
