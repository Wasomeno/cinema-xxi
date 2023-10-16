import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { cinemaId } = context.params
  const { adminIds } = await request.json()
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.cinema?.id !== parseInt(cinemaId) || !session) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }
    await prisma.admin.deleteMany({ where: { id: { in: adminIds } } })
    return NextResponse.json({
      message: "Succesfully deleted admins",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
