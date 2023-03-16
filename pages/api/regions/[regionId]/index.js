import { prisma } from "lib/prisma";

export default async function regionDetailsHandler(req, res) {
  const { regionId } = req.query;
  if (req.method === "GET") {
    const regionDetails = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      include: { cinema: true },
    });
    res.status(200).json(regionDetails);
  }
}
