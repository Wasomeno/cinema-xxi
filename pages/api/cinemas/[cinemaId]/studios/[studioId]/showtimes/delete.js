import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function studioShowtimesDelete(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const { showtimeIds } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.showtimeToMovie.deleteMany({
        where: { id: { in: showtimeIds } },
      })
      res.status(200).json({
        code: 200,
        message: "Successfully removed showtimes",
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
