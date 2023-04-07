import { prisma } from "lib/prisma";

export default async function showtimeSeatsHandler(req, res) {
  if (req.method === "GET") {
    const { showtimeId, date } = req.query;
    const isDateExist = await prisma.seatsDates.findUnique({
      where: { date: parseInt(date) },
    });
    let showtime;
    if (isDateExist) {
      showtime = await prisma.showtime.findUnique({
        where: { id: parseInt(showtimeId) },
        select: {
          showtimeSeats: {
            select: { seatsTaken: true, id: true },
            where: {
              seatsDates: { date: parseInt(date) },
              showtimeId: parseInt(showtimeId),
            },
          },
        },
      });
    }
    const seatsTaken = isDateExist
      ? showtime.showtimeSeats
      : [{ seatsTaken: [], id: 0 }];
    res.status(200).json(...seatsTaken);
  }
}
