import { prisma } from "lib/prisma";

export default async function deleteCinemasHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaIds } = req.body;
    try {
      await prisma.cinema.deleteMany({ where: { id: { in: cinemaIds } } });
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted cinemas" });
    } catch (error) {
      res.status(500).json({ code: 500, error });
    }
  }
}
