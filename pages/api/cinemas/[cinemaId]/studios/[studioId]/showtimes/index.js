import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function studioShowtimesHandler(req, res) {
  const { studioId, cinemaId } = req.query
  if (req.method === "GET") {
    const studioShowtimes = await prisma.showtimeToMovie.findMany({
      where: { studio_id: parseInt(studioId) },
      select: { id: true, movie: true, showtime: true },
    })
    res.status(200).json(
      studioShowtimes.map((showtimeDetails) => ({
        id: showtimeDetails.id,
        movieId: showtimeDetails.movie.id,
        movieTitle: showtimeDetails.movie.title,
        showtimeId: showtimeDetails.showtime.id,
        showtimeHour: showtimeDetails.showtime.hour,
        showtimeMinutes: showtimeDetails.showtime.minutes,
      }))
    )
  } else if (req.method === "POST") {
    const { showtimeId, movieId } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.showtimeToMovie.create({
        data: {
          movie: { connect: { id: movieId } },
          showtime: { connect: { id: parseInt(showtimeId) } },
          studio: { connect: { id: parseInt(studioId) } },
        },
      })
      res
        .status(200)
        .json({ code: 200, message: "Successfully added new studio showtime" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
