import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { adminId } }
) {
  const { adminId } = context.params
  const adminDetails = await prisma.admin.findUnique({
    where: { id: parseInt(adminId) },
  })
  return NextResponse.json(adminDetails)
}

export async function PATCH(
  request: NextRequest,
  context: { params: { adminId: string; cinemaId: string } }
) {
  const { adminId, cinemaId } = context.params
  const { name, username, password } = await request.json()
  const session = await getServerSession(authOptions)

  try {
    if (session?.user?.cinemaId !== cinemaId || !session) {
      return NextResponse.json({ message: "Session Invalid" })
    }
    await prisma.admin.update({
      where: { id: parseInt(adminId) },
      data: { username, name, password },
    })
    return NextResponse.json({ message: "Succesfully updated admin" })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
