import { prisma } from "lib/prisma"

export default async function userTransactionsHandler(req, res) {
  const { userAddress, history } = req.query

  const dateISOString = new Date().toISOString()
  const isHistory = history !== undefined

  if (req.method === "GET") {
    const transactions = await prisma.transaction.findMany({
      where: {
        user: userAddress,
        createdAt: isHistory ? { lt: dateISOString } : { gt: dateISOString },
      },
      include: { movie: true, cinema: true, region: true },
    })

    res.status(200).json(
      transactions.map((transaction) => ({
        ...transaction,
        showtime: parseInt(transaction.showtime),
      }))
    )
  }
}
