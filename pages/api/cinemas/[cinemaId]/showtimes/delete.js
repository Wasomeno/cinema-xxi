import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function deleteCinemaShowtime(req, res) {
  const { cinemaId } = req.query
  const session = await getServerSession(authOptions)
  if (req.method === "POST") {
    const { showtimeIds } = req.body
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.showtime.deleteMany({ where: { id: { in: showtimeIds } } })
      res
        .status(200)
        .json({ code: "200", message: "Succesfully deleted showtimes" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
