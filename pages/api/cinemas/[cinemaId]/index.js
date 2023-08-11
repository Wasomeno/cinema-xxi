import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function cinemaDetailsHandler(req, res) {
  const prisma = new PrismaClient()
  const { cinemaId } = req.query
  if (req.method === "GET") {
    const cinemaDetails = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      include: {
        movie: { include: { cinema: true, showtime: true } },
        region: true,
        studio: true,
        showtimes: true,
        transactions: true,
      },
    })
    res.status(200).json({
      ...cinemaDetails,
      transactions: cinemaDetails.transactions.map((transaction) => ({
        ...transaction,
        showtime: transaction.showtime.toString(),
      })),
    })
  } else if (req.method === "PATCH") {
    const { cinemaName } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: { name: cinemaName },
      })
      res
        .status(200)
        .json({ code: 200, message: "Successfully updated cinema" })
    } catch (error) {
      res.status(500).json({ code: 500, error })
    }
  }
}
