import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { regionId: string } }
) {
  const { regionId } = context.params
  const regionDetails = await prisma.region.findUnique({
    where: { id: parseInt(regionId) },
    include: { cinemas: true },
  })
  return NextResponse.json(regionDetails)
}

export async function POST(
  request: NextRequest,
  context: { params: { regionId: string } }
) {
  const { regionId } = context.params
  const { name } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.region.update({
      where: { id: parseInt(regionId) },
      data: { name },
    })
    return NextResponse.json({
      message: "Succesfully updated region",
    })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
