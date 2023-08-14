import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteCinemaStudioHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.cinemaId !== parseInt(cinemaId) || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      const { studioIds } = req.body
      await prisma.studio.deleteMany({
        where: { id: { in: studioIds } },
      })
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted studio" })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
