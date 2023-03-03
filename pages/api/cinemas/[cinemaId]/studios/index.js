import { prisma } from "lib/prisma";

export default async function studiosHandler(req, res) {
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const cinemaStudios = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      select: { studio: true },
    });
    res.status(200).json(cinemaStudios);
  } else if (req.method === "POST") {
    const { studioCapacity, studioNumber } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: {
          studio: {
            create: {
              capacity: parseInt(studioCapacity),
              studio: parseInt(studioNumber),
            },
          },
        },
      });
      res.status(200).json({
        code: "200",
        text: "Succesfully added studio" + " " + studioNumber,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
