import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function cinemaShowtimesHandler(req, res) {
  const { cinemaId } = req.query
  const session = await getServerSession(authOptions)

  if (req.method === "GET") {
    const cinemaShowtimes = await prisma.showtime.findMany({
      where: { cinemaId: parseInt(cinemaId) },
    })
    res.status(200).json(cinemaShowtimes)
  } else if (req.method === "POST") {
    try {
      const { hour, minutes } = req.body

      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }

      await prisma.showtime.create({
        data: {
          hour: parseInt(hour),
          minutes: parseInt(minutes),
          cinema: { connect: { id: parseInt(cinemaId) } },
        },
      })
      res
        .status(200)
        .json({ code: "200", message: "Succesfully added new showtime" })
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
