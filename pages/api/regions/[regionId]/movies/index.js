import { prisma } from "lib/prisma"
import { TbSquareF9 } from "react-icons/tb"

export default async function regionMoviesHandler(req, res) {
  const { regionId } = req.query
  if (req.method === "GET") {
    const region = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      select: {
        cinemas: {
          select: {
            cinema_movie: {
              select: {
                movies: {
                  include: { _count: { select: { showtime_to_movie: true } } },
                },
              },
            },
          },
        },
      },
    })

    const cinemaMovies = region.cinemas.filter(
      (cinema) => cinema.cinema_movie?.movies.length > 0
    )

    res
      .status(200)
      .json(
        !cinemaMovies.length
          ? []
          : cinemaMovies.flatMap((cinema) =>
              cinema.cinema_movie.movies.filter(
                (movie) => movie._count.showtime_to_movie > 0
              )
            )
      )
  }
}
