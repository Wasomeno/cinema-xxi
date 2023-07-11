import { prisma } from "lib/prisma";

export default async function regionCinemasHandler(req, res) {
  const { regionId } = req.query;
  if (req.method === "GET") {
    const cinemas = await prisma.cinema.findMany({
      where: { regionId: parseInt(regionId) },
    });
    res.status(200).json(cinemas);
  }
}
