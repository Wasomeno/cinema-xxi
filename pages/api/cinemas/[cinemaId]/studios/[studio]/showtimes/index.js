import { prisma } from "lib/prisma";

export default async function studioShowtimesHandler(req, res) {
  if (req.method === "GET") {
    const { cinemaId, studio } = req.query;
    const studioShowtimes = await prisma.studio.findFirst({
      where: { cinemaId: parseInt(cinemaId), studio: parseInt(studio) },
      select: { showtime: true },
    });
    res.status(200).json(studioShowtimes);
  } else if (req.method === "POST") {
    const { cinemaId, studioId, showtimeIds } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          studio: {
            update: {
              where: { id: parseInt(studioId) },
              data: { showtime: { connect: showtimeIds } },
            },
          },
        },
      });
      res.status(200).json({
        code: 200,
        text: "Successfully added new showtimes to studio",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
