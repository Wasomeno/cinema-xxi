import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(context: { params: { cinemaId: string } }) {
  const cinemaAdmins = await prisma.admin.findMany({
    where: { cinemaId: parseInt(context.params.cinemaId) },
  })
  return NextResponse.json(cinemaAdmins)
}

export async function POST(
  request: NextRequest,
  context: { params: { cinemaId: string } }
) {
  const { name, username, password } = await request.json()
  const session = await getServerSession(authOptions)
  try {
    if (
      session?.user?.cinemaId !== parseInt(context.params.cinemaId) ||
      !session
    ) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 500 })
    }

    await prisma.admin.create({
      data: {
        name,
        username,
        password,
        cinema: { connect: { id: parseInt(context.params.cinemaId) } },
      },
    })
    return NextResponse.json({
      code: 200,
      message: "Succesfully added new admin",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
