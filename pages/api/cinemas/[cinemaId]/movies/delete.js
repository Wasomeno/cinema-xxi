import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteCinemaMoviesHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const { movieIds } = req.body
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.cinemaId !== parseInt(cinemaId) || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          cinema_movie: { update: { movies: { disconnect: movieIds } } },
        },
      })
      res
        .status(200)
        .json({ code: "200", message: "Successfully deleted movies" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
