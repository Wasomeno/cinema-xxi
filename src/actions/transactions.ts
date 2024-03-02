"use server"

import { prisma } from "@/lib/prisma"

export async function getTransactions(address: string, isHistory: boolean) {
  const dateISOString = new Date().toISOString()

  const transactions = await prisma.transaction.findMany({
    where: {
      user: address,
      createdAt: isHistory ? { lt: dateISOString } : { gt: dateISOString },
    },
    include: { movie: true, cinema: true, region: true },
  })

  return transactions
}
