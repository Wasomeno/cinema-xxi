import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: { transactionId: string } }
) {
  const { transactionId } = context.params
  const transactionDetails = await prisma.transaction.findUnique({
    where: { id: parseInt(transactionId) },
    include: { cinema: true, movie: true, region: true },
  })
  return NextResponse.json({
    ...transactionDetails,
    showtime: transactionDetails?.showtime.toString(),
  })
}
