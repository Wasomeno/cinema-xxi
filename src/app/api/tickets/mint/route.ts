import { NextRequest, NextResponse } from "next/server"
import moment from "moment"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
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
  } = await request.json()
  try {
    const realShowtime = moment({
      date: selectedDate.date,
      month: selectedDate.month,
    })
      .hour(showtime.showtime.hour)
      .minute(showtime.showtime.minutes)
      .second(0)
      .unix()

    const isSeatsAvailable = await prisma.seat.findMany({
      where: {
        showTimeToMovieId: parseInt(showtime.studioShowtimeId),
        date: parseInt(selectedDate.date),
      },
    })

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
      })
    } else {
      await prisma.showtimeToMovie.update({
        where: { id: parseInt(showtime.studioShowtimeId) },
        data: {
          seats: {
            create: { date: selectedDate.date, seats_taken: seatNumbers },
          },
        },
      })
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
    })
    return NextResponse.json({
      message: "Succesfully minted tickets",
    })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
