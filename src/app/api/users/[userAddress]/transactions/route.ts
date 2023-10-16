import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { userAddress: string } }
) {
  const { userAddress } = context.params
  const searchParams = request.nextUrl.searchParams

  const dateISOString = new Date().toISOString()
  const isHistory = searchParams.get("history") !== null

  const transactions = await prisma.transaction.findMany({
    where: {
      user: userAddress,
      createdAt: isHistory ? { lt: dateISOString } : { gt: dateISOString },
    },
    include: { movie: true, cinema: true, region: true },
  })

  return NextResponse.json(
    transactions.map((transaction) => ({
      ...transaction,
      showtime: parseInt(transaction.showtime.toString()),
    }))
  )
}
