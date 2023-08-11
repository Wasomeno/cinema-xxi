import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function regionDetailsHandler(req, res) {
  const { regionId } = req.query
  if (req.method === "GET") {
    const regionDetails = await prisma.region.findUnique({
      where: { id: parseInt(regionId) },
      include: { cinemas: true },
    })
    res.status(200).json(regionDetails)
  }
  if (req.method === "PUT") {
    const { name } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.region.update({
        where: { id: parseInt(regionId) },
        data: { name },
      })
      res.status(200).json({ code: 200, message: "Succesfully updated region" })
    } catch (error) {
      res.status(500).json({ code: 500, message: error })
    }
  }
}
