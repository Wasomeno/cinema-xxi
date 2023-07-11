import { prisma } from "lib/prisma";

export default async function deleteRegionsHandler(req, res) {
  if (req.method === "POST") {
    const { regionIds } = req.body;
    try {
      await prisma.region.deleteMany({ where: { id: { in: regionIds } } });
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted regions" });
    } catch (error) {
      res.status(500).json({ code: 500, error });
    }
  }
}
