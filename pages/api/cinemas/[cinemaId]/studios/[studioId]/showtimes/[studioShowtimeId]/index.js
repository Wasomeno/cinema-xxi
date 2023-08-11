import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function studioShowtimeHandler(req, res) {
  const { cinemaId, studioShowtimeId } = req.query
  if (req.method === "GET") {
    const studioShowtime = await prisma.showtimeToMovie.findUnique({
      where: { id: parseInt(studioShowtimeId) },
      include: { movie: true, showtime: true },
    })
    res.status(200).json(studioShowtime)
  } else if (req.method === "PATCH") {
    const { showtimeId, movieId } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.showtimeToMovie.update({
        where: { id: parseInt(studioShowtimeId) },
        data: {
          movie: { connect: { id: movieId } },
          showtime: { connect: { id: parseInt(showtimeId) } },
        },
      })
      res
        .status(200)
        .json({ code: 200, message: "Successfully updated studio showtime" })
    } catch (error) {
      res.status(500).json({ code: 500, error })
    }
  }
}
