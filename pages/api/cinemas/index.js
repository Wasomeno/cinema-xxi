import { prisma } from "lib/prisma";

export default async function cinemaHandler(req, res) {
  if (req.method === "GET") {
    const cinemas = await prisma.cinema.findMany();
    res.status(200).json(cinemas);
  } else if (req.method === "POST") {
    const { cinemaName, studioDetails, regionId } = req.body;
    try {
      await prisma.cinema.create({
        data: {
          name: cinemaName,
          regionId: regionId,
          studio: { createMany: { data: studioDetails } },
        },
      });
      res
        .status(200)
        .json({ code: "200", text: "Successfully added cinema " + cinemaName });
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    const { cinemaIds } = req.body;
    try {
      await prisma.cinema.deleteMany({ where: { id: { in: cinemaIds } } });
      res.status(200).json({ code: "200", text: "Succesfully deleted cinema" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
