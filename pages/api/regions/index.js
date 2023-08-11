import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"

export default async function regionHandler(req, res) {
  if (req.method === "GET") {
    const regions = await prisma.region.findMany({
      include: { cinemas: true },
    })
    res.status(200).json(regions)
  } else if (req.method === "POST") {
    const { regionName } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.region.create({
        data: { name: regionName },
      })
      res.status(200).json({
        code: "200",
        message: "Sucessfully added region " + regionName,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
