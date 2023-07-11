import { prisma } from "lib/prisma";

export default async function studioShowtimesDelete(req, res) {
  if (req.method === "POST") {
    const { showtimeIds } = req.body;
    try {
      await prisma.showtimeToMovie.deleteMany({
        where: { id: { in: showtimeIds } },
      });
      res.status(200).json({
        code: 200,
        message: "Successfully removed showtimes",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
