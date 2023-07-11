import { prisma } from "lib/prisma";

export default async function deleteCinemaStudioHandler(req, res) {
  if (req.method === "POST") {
    try {
      const { studioIds } = req.body;
      await prisma.studio.deleteMany({
        where: { id: { in: studioIds } },
      });
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted studio" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
