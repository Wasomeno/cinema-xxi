import { PrismaClient } from "@prisma/client";

export default async function cinemaDetailsHandler(req, res) {
  const prisma = new PrismaClient();
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const cinemaDetails = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      include: { movie: true, admin: true, region: true, studio: true },
    });
    res.status(200).json(cinemaDetails);
  }
}
