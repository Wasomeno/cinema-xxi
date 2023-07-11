import { prisma } from "lib/prisma";

export default async function cinemaMoviesHandler(req, res) {
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const cinema = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      select: { cinema_movie: { select: { movies: true } } },
    });
    const movies = cinema.cinema_movie ? cinema.cinema_movie.movies : [];
    res.status(200).json(movies);
  } else if (req.method === "POST") {
    const { movieIds } = req.body;
    try {
      const isCinemaMovieExists = await prisma.cinemaMovie.findUnique({
        where: { cinema_id: parseInt(cinemaId) },
      });
      if (!isCinemaMovieExists) {
        await prisma.cinema.update({
          where: { id: parseInt(cinemaId) },
          data: {
            cinema_movie: {
              connectOrCreate: {
                where: { cinema_id: parseInt(cinemaId) },
                create: { movies: { connect: movieIds } },
              },
            },
          },
        });
      } else {
        await prisma.cinema.update({
          where: { id: parseInt(cinemaId) },
          data: {
            cinema_movie: {
              update: {
                movies: { connect: movieIds },
              },
            },
          },
        });
      }
      res
        .status(200)
        .json({ code: "200", message: "Successfully added new movies" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
