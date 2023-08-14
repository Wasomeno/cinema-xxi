import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteCinemaAdminsHandler(req, res) {
  if (req.method === "POST") {
    const { cinemaId } = req.query
    const { adminIds } = req.body
    try {
      const session = await getServerSession(req, res, authOptions)
      if (session.user.cinemaId !== parseInt(cinemaId) || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.admin.deleteMany({ where: { id: { in: adminIds } } })
      res.status(200).json({ code: 200, message: "Succesfully deleted admins" })
    } catch (error) {
      res.status(400).json(error)
    }
  }
}
