import { prisma } from "lib/prisma";

export default async function cinemaAdminsHandler(req, res) {
  if (req.method === "GET") {
    const { cinemaId } = req.query;
    const cinemaAdmins = await prisma.admin.findMany({
      where: { cinemaId: parseInt(cinemaId) },
    });
    res.status(200).json(cinemaAdmins);
  }
}
