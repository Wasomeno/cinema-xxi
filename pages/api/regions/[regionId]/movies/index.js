import { prisma } from "lib/prisma";

export default async function regionMoviesHandler(req, res) {
  const { regionId } = req.query;
  if (req.method === "GET") {
    const regionCinemas = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      select: {
        cinemas: {
          select: { cinema_movie: { select: { movies: true } } },
        },
      },
    });
    const movies = regionCinemas.cinemas.map((cinema) => cinema.cinema_movie);
    res
      .status(200)
      .json(movies.flatMap((movie) => (movie === null ? [] : movie?.movies)));
  }
}
