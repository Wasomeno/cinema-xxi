import { prisma } from "lib/prisma";

export default async function movieDetailsInRegionHandler(req, res) {
  const { regionId, movieId } = req.query;
  if (req.method === "GET") {
    const showtimes = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      select: {
        cinema: {
          include: {
            movie: {
              where: { id: parseInt(movieId) },
              select: {
                showtime: {
                  where: { movieId: parseInt(movieId) },
                  include: { movie: true, studio: true, cinema: true },
                },
              },
            },
          },
        },
      },
    });
    const showtimesFlat = showtimes.cinema.flatMap((cinema) => ({
      id: cinema.id,
      regionId: cinema.regionId,
      name: cinema.name,
      showtimes: cinema.movie.flatMap((cinemaShowtime) =>
        cinemaShowtime.showtime.flat()
      ),
    }));
    res.status(200).json(showtimesFlat);
  }
}
