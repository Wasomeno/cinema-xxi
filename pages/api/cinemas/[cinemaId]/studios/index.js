import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function studiosHandler(req, res) {
  const { cinemaId } = req.query
  if (req.method === "GET") {
    const cinema = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      select: {
        studios: {
          include: {
            showtime_to_movie: { include: { movie: true, showtime: true } },
          },
        },
      },
    })
    res.status(200).json(cinema.studios)
  } else if (req.method === "POST") {
    const { studioCapacity, studioNumber } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          studios: {
            create: {
              capacity: parseInt(studioCapacity),
              studio: parseInt(studioNumber),
            },
          },
        },
      })
      res.status(200).json({
        code: "200",
        message: `Succesfully added studio ${studioNumber}`,
      })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
