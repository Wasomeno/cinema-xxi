import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function deleteCinemaStudioHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
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
