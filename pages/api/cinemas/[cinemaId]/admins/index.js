import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function cinemaAdminsHandler(req, res) {
  const { cinemaId } = req.query

  if (req.method === "GET") {
    const cinemaAdmins = await prisma.admin.findMany({
      where: { cinemaId: parseInt(cinemaId) },
    })
    res.status(200).json(cinemaAdmins)
  }

  if (req.method === "POST") {
    const { name, username, password } = req.body
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.cinemaId !== parseInt(cinemaId) || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.admin.create({
        data: {
          name,
          username,
          password,
          cinema: { connect: { id: parseInt(cinemaId) } },
        },
      })
      res
        .status(200)
        .json({ code: 200, message: "Succesfully added new admin" })
    } catch (error) {
      res.status(500).json({ code: 500, error })
    }
  }
}
