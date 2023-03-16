import { prisma } from "lib/prisma";

export default async function cinemaAdminsHandler(req, res) {
  if (req.method === "GET") {
    const { cinemaId } = req.query;
    const cinemaAdmins = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      select: { admin: true },
    });
    res.status(200).json(cinemaAdmins);
  }
}
