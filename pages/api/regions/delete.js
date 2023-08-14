import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteRegionsHandler(req, res) {
  if (req.method === "POST") {
    const { regionIds } = req.body
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.region.deleteMany({ where: { id: { in: regionIds } } })
      res
        .status(200)
        .json({ code: 200, message: "Successfully deleted regions" })
    } catch (error) {
      res.status(500).json({ code: 500, error })
    }
  }
}
