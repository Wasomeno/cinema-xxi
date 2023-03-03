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
      const { showtime } = req.body;
      await prisma.showtime.create({
        data: {
          time: parseInt(showtime),
          cinema: { connect: { id: parseInt(cinemaId) } },
        },
      });
      res
        .status(200)
        .json({ code: "200", text: "Succesfully added new showtime" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else if (req.method === "DELETE") {
    const { showtimes } = req.body;
    try {
      await prisma.showtime.deleteMany({ where: { time: { in: showtimes } } });
      res
        .status(200)
        .json({ code: "200", text: "Succesfully deleted showtimes" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
