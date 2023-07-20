import { prisma } from "lib/prisma";

export default async function showtimeHandler(req, res) {
  const { showtimeId } = req.query;
  if (req.method === "GET") {
    const showtime = await prisma.showtime.findUnique({
      where: { id: parseInt(showtimeId) },
    });
    res.status(200).json(showtime);
  } else if (req.method === "PATCH") {
    const { hour, minutes } = req.body;
    try {
      await prisma.showtime.update({
        where: { id: parseInt(showtimeId) },
        data: { hour: parseInt(hour), minutes: parseInt(minutes) },
      });
      res.status(200).json({ message: "Succesfully updated showtime" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
