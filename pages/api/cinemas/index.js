import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"

export default async function cinemaHandler(req, res) {
  if (req.method === "GET") {
    const cinemas = await prisma.cinema.findMany()
    res.status(200).json(cinemas)
  } else if (req.method === "POST") {
    const { cinemaName, studioDetails, regionId } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.cinema.create({
        data: {
          name: cinemaName,
          regionId: regionId,
          studios: { createMany: { data: studioDetails } },
        },
      })
      res.status(200).json({
        code: "200",
        message: `Successfully added ${cinemaName}`,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
