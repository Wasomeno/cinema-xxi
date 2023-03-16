import { prisma } from "lib/prisma";
import moment from "moment";

export default async function mintTicketHandler(req, res) {
  if (req.method == "POST") {
    const ticketDetails = req.body;
    try {
      const month = moment().month();
      const year = moment().year();
      const realShowtime = moment({ date: ticketDetails.selectedDate })
        .add({
          seconds: ticketDetails.showtime.time,
        })
        .unix();
      await prisma.showtime.update({
        // where: { id: ticketDetails.showtime.id },
        data: {
          showtimeSeats: {
            upsert: {
              where: { id: ticketDetails.seatsId },
              create: {
                cinema: { connect: { id: ticketDetails.cinemaId } },
                seatsDates: {
                  connectOrCreate: {
                    where: { date: ticketDetails.selectedDate },
                    create: {
                      date: ticketDetails.selectedDate,
                      month: month,
                      year: year,
                    },
                  },
                },
                seatsTaken: ticketDetails.seatNumbers,
              },
              update: { seatsTaken: { push: ticketDetails.seatNumbers } },
            },
          },
        },
      });
      await prisma.transaction.create({
        data: {
          cinema: { connect: { id: ticketDetails.cinemaId } },
          movie: { connect: { id: ticketDetails.movieId } },
          region: { connect: { id: ticketDetails.regionId } },
          showtime: realShowtime,
          userDetails: {
            connectOrCreate: {
              where: { address: ticketDetails.userAddress },
              create: { address: ticketDetails.userAddress, name: "TEst" },
            },
          },
          studio: ticketDetails.studio,
          ticketIds: { set: ticketDetails.ticketIds },
          total: ticketDetails.total,
        },
      });
      res.status(200).json({ code: 200, text: "Succesfully minted tickets" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
