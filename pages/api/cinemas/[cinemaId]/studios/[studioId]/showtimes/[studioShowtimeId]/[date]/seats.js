import { prisma } from "lib/prisma";

export default async function showtimeSeatsHandler(req, res) {
  const { studioShowtimeId, date } = req.query;
  if (req.method === "GET") {
    let seats;
    const isSeatsAvailable = await prisma.seat.findMany({
      where: {
        showTimeToMovieId: parseInt(studioShowtimeId),
        date: parseInt(date),
      },
    });
    const studioDetails = await prisma.showtimeToMovie.findUnique({
      where: { id: parseInt(studioShowtimeId) },
      select: { studio: true },
    });
    if (isSeatsAvailable.length) {
      seats = { ...isSeatsAvailable[0], studio: studioDetails.studio };
    } else {
      seats = { seats_taken: [], studio: studioDetails.studio };
    }
    res.status(200).json(seats);
  }
}
