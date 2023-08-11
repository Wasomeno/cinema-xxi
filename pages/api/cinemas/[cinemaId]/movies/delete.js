import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function deleteCinemaMoviesHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const { movieIds } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
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
