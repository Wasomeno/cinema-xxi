import { prisma } from "lib/prisma";

export default async function regionMoviesHandler(req, res) {
  const { regionId } = req.query;
  if (req.method === "GET") {
    const regionCinemas = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      select: {
        cinema: {
          select: { movie: { include: { showtime: true } } },
        },
      },
    });
    const regionMovies = regionCinemas.cinema.flatMap((cinema) => cinema.movie);
    res.status(200).json(regionMovies);
  }
}
