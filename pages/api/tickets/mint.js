import { prisma } from "lib/prisma";
import moment from "moment";

export default async function mintTicketHandler(req, res) {
  if (req.method == "POST") {
    const {
      selectedDate,
      regionId,
      studio,
      movieId,
      showtime,
      cinemaId,
      seatsId,
      seatNumbers,
      ticketIds,
      total,
      userAddress,
    } = req.body;
    try {
      const realShowtime = moment({
        date: selectedDate.date,
        month: selectedDate.month,
      })
        .hour(showtime.showtime.hour)
        .minute(showtime.showtime.minutes)
        .second(0)
        .unix();

      const isSeatsAvailable = await prisma.seat.findMany({
        where: {
          showTimeToMovieId: parseInt(showtime.studioShowtimeId),
          date: parseInt(selectedDate.date),
        },
      });

      if (isSeatsAvailable.length) {
        await prisma.showtimeToMovie.update({
          where: { id: parseInt(showtime.studioShowtimeId) },
          data: {
            seats: {
              update: {
                where: { id: seatsId },
                data: { seats_taken: { push: seatNumbers } },
              },
            },
          },
        });
      } else {
        await prisma.showtimeToMovie.update({
          where: { id: parseInt(showtime.studioShowtimeId) },
          data: {
            seats: {
              create: { date: selectedDate.date, seats_taken: seatNumbers },
            },
          },
        });
      }

      await prisma.transaction.create({
        data: {
          cinema: { connect: { id: cinemaId } },
          movie: { connect: { id: movieId } },
          region: { connect: { id: regionId } },
          showtime: realShowtime,
          userDetails: {
            connectOrCreate: {
              where: { address: userAddress },
              create: { address: userAddress, name: "TEst" },
            },
          },
          studio: studio,
          ticketIds: { set: ticketIds },
          total: total,
        },
      });
      res
        .status(200)
        .json({ code: 200, message: "Succesfully minted tickets" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
