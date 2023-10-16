import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { regionId: string } }
) {
  const { regionId } = context.params
  const cinemas = await prisma.cinema.findMany({
    where: { regionId: parseInt(regionId) },
  })
  return NextResponse.json(cinemas)
}
