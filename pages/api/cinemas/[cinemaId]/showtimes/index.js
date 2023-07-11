import { prisma } from "lib/prisma";

export default async function cinemaShowtimesHandler(req, res) {
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const cinemaShowtimes = await prisma.showtime.findMany({
      where: { cinemaId: parseInt(cinemaId) },
    });
    res.status(200).json(cinemaShowtimes);
  } else if (req.method === "POST") {
    try {
      const { hour, minutes } = req.body;
      await prisma.showtime.create({
        data: {
          hour: parseInt(hour),
          minutes: parseInt(minutes),
          cinema: { connect: { id: parseInt(cinemaId) } },
        },
      });
      res
        .status(200)
        .json({ code: "200", message: "Succesfully added new showtime" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else if (req.method === "PUT") {
    const { id, hour, minutes } = req.body;
    try {
      await prisma.showtime.update({
        where: { id: parseInt(id) },
        data: { hour: parseInt(hour), minutes: parseInt(minutes) },
      });
      res
        .status(200)
        .json({ code: "200", message: "Succesfully updated showtime" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
