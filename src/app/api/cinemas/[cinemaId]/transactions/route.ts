import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  const allTransactions = await prisma.transaction.findMany()
  return NextResponse.json(allTransactions)
}
