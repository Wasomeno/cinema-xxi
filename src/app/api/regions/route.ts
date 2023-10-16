import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const regions = await prisma.region.findMany({
    include: { _count: { select: { cinemas: true } } },
  })
  return NextResponse.json(regions)
}

export async function POST(request: NextRequest) {
  const { regionName } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.region.create({
      data: { name: regionName },
    })
    return NextResponse.json(
      {
        message: "Sucessfully added region " + regionName,
      },
      { status: 500 }
    )
  } catch (error) {
    return NextResponse.json(error)
  }
}
