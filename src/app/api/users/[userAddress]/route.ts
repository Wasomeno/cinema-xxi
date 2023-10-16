import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function userDetailsHandler(
  request: NextRequest,
  context: { params: { userAddress: string } }
) {
  try {
    const { userAddress } = context.params
    const userDetails = await prisma.transaction.findMany({
      where: { user: userAddress.toString() },
      include: { cinema: true, movie: true, region: true },
    })
    const convertedDetails = userDetails.map((transaction) => ({
      ...transaction,
      showtime: transaction.showtime.toString(),
    }))
    return NextResponse.json(convertedDetails)
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
