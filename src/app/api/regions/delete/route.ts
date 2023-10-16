import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { regionIds } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (session?.user?.role !== "manager" || !session) {
      return NextResponse.json({ status: 500, message: "Session Invalid" })
    }
    await prisma.region.deleteMany({ where: { id: { in: regionIds } } })
    return NextResponse.json({
      code: 200,
      message: "Successfully deleted regions",
    })
  } catch (error) {
    return NextResponse.json({ code: 500, error })
  }
}
