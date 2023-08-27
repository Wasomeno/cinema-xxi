import { prisma } from "lib/prisma"

export default async function userTransactionsHandler(req, res) {
  const { userAddress } = req.query
  if (req.method === "GET") {
    const transactions = await prisma.transaction.findMany({
      where: { user: userAddress },
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
