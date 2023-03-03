import { PrismaClient } from "@prisma/client";

export default async function regionDetailsHandler(req, res) {
  const prisma = new PrismaClient();
  const { regionId } = req.query;
  if (req.method === "GET") {
    const regionDetails = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      include: { cinema: true },
    });
    res.status(200).json(regionDetails);
  }
}
