import { prisma } from "lib/prisma";

export default async function studioShowtimesHandler(req, res) {
  const { studioId, cinemaId } = req.query;
  if (req.method === "GET") {
    const studioShowtimes = await prisma.showtimeToMovie.findMany({
      where: { studio_id: parseInt(studioId) },
      select: { id: true, movie: true, showtime: true },
    });
    res.status(200).json(
      studioShowtimes.map((showtimeDetails) => ({
        id: showtimeDetails.id,
        movieId: showtimeDetails.movie.id,
        movieTitle: showtimeDetails.movie.title,
        showtimeId: showtimeDetails.showtime.id,
        showtimeHour: showtimeDetails.showtime.hour,
        showtimeMinutes: showtimeDetails.showtime.minutes,
      }))
    );
  } else if (req.method === "POST") {
    const { showtimeId, movieId } = req.body;
    try {
      await prisma.showtimeToMovie.create({
        data: {
          movie: { connect: { id: movieId } },
          showtime: { connect: { id: parseInt(showtimeId) } },
          studio: { connect: { id: parseInt(studioId) } },
        },
      });
      res
        .status(200)
        .json({ code: 200, message: "Successfully added new studio showtime" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
