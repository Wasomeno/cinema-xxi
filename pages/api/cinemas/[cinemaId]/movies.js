import { prisma } from "lib/prisma";

export default async function cinemaMoviesHandler(req, res) {
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const moviesInCinema = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      select: { movie: true },
    });
    res.status(200).json(moviesInCinema);
  } else if (req.method === "POST") {
    const { movieIds } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: { movie: { connect: movieIds } },
      });
      res
        .status(200)
        .json({ code: "200", text: "Successfully added new movies" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else if (req.method === "DELETE") {
    const { movieIds } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: { movie: { disconnect: movieIds } },
      });
      res
        .status(200)
        .json({ code: "200", text: "Successfully deleted movies" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
