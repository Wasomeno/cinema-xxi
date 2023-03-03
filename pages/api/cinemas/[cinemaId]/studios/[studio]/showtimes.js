import { prisma } from "lib/prisma";

export default async function studioShowtimesHandler(req, res) {
  const { cinemaId, studio } = req.query;
  if (req.method === "GET") {
    const studioShowtimes = await prisma.studio.findFirst({
      where: { cinemaId: parseInt(cinemaId), studio: parseInt(studio) },
      select: { showtime: true },
    });
    res.status(200).json(studioShowtimes);
  } else if (req.method === "POST") {
  }
}
