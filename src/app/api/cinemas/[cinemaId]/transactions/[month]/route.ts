import { NextResponse } from "next/server"
import moment from "moment"

import { prisma } from "@/lib/prisma"

export async function GET(context: {
  params: { cinemaId: string; month: string }
}) {
  const { cinemaId, month } = context.params
  const date = new Date(`${month}/2/2023`)
  const dateAddedMonth = new Date(`${parseInt(month) + 1}/2/2023`)
  const transactions = await prisma.transaction.findMany({
    where: {
      cinemaId: parseInt(cinemaId),
      createdAt: { gte: date, lt: dateAddedMonth },
    },
    select: { regionId: true, cinemaId: true, total: true, createdAt: true },
  })

  const dateMoment = moment(date)
  let salesData = []
  for (let i = 0; i < dateMoment.daysInMonth(); i++) {
    const filteredTransaction = transactions.filter(
      (transaction) => transaction.createdAt.getDate() === i + 1
    )
    salesData.push({
      date: i + 1,
      total: filteredTransaction.reduce(
        (value, transaction) => value + transaction.total,
        0
      ),
    })
  }
  return NextResponse.json(salesData)
}
