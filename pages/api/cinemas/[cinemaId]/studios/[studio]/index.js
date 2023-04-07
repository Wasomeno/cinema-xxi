import { prisma } from "lib/prisma";

export default async function studioDetailsHandler(req, res) {
  const { studio } = req.query;
  if (req.method === "GET") {
    const studioDetails = await prisma.studio.findUnique({
      where: { id: parseInt(studio) },
      include: { showtime: true },
    });
    res.status(200).json(studioDetails);
  } else if (req.method === "POST") {
  }
}
