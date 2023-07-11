import { prisma } from "lib/prisma";

export default async function studioShowtimeHandler(req, res) {
  const { studioShowtimeId } = req.query;
  if (req.method === "PATCH") {
    const { showtimeId, movieId } = req.body;
    try {
      await prisma.showtimeToMovie.update({
        where: { id: parseInt(studioShowtimeId) },
        data: {
          movie: { connect: { id: parseInt(movieId) } },
          showtime: { connect: { id: parseInt(showtimeId) } },
        },
      });
      res
        .status(200)
        .json({ code: 200, message: "Successfully updated studio showtime" });
    } catch (error) {
      res.status(500).json({ code: 500, error });
    }
  }
}
