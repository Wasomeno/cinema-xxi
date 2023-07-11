import { prisma } from "lib/prisma";

export default async function deleteCinemaMoviesHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query;
    const { movieIds } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          cinema_movie: { update: { movies: { disconnect: movieIds } } },
        },
      });
      res
        .status(200)
        .json({ code: "200", message: "Successfully deleted movies" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
