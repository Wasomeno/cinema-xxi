import { prisma } from "lib/prisma";

export default async function deleteCinemaShowtime(req, res) {
  if (req.method === "POST") {
    const { showtimeIds } = req.body;
    try {
      await prisma.showtime.deleteMany({ where: { id: { in: showtimeIds } } });
      res
        .status(200)
        .json({ code: "200", message: "Succesfully deleted showtimes" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
