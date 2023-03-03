import { prisma } from "lib/prisma";

export default async function studioDetailsHandler(req, res) {
  const { cinemaId, studio } = req.query;
  if (req.method === "GET") {
    const studioDetails = await prisma.studio.findFirst({
      where: { cinemaId: parseInt(cinemaId), studio: parseInt(studio) },
      include: { showtime: true },
    });
    res.status(200).json(studioDetails);
  } else if (req.method === "POST") {
  }
}
