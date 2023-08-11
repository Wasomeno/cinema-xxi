import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function studioDetailsHandler(req, res) {
  const { cinemaId, studioId } = req.query
  if (req.method === "GET") {
    const studioDetails = await prisma.studio.findUnique({
      where: { id: parseInt(studioId) },
      include: { showtime_to_movie: true },
    })
    res.status(200).json(studioDetails)
  }
  if (req.method === "PATCH") {
    const { capacity, studio } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.studio.update({
        where: { id: parseInt(studioId) },
        data: { capacity: parseInt(capacity), studio: parseInt(studio) },
      })
      res.status(200).json({ message: "Succesfully updated studio" })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
