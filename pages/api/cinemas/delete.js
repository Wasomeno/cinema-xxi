import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteCinemasHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaIds } = req.body
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.cinema.deleteMany({ where: { id: { in: cinemaIds } } })
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted cinemas" })
    } catch (error) {
      res.status(500).json({ code: 500, error })
    }
  }
}
