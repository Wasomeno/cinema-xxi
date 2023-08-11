import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

export default async function cinemaAdminHandler(req, res) {
  const { cinemaId, adminId } = req.query
  if (req.method === "GET") {
    const adminDetails = await prisma.admin.findUnique({
      where: { id: parseInt(adminId) },
    })
    res.status(200).json(adminDetails)
  } else if (req.method === "PATCH") {
    const { name, username, password } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.cinemaId !== cinemaId || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.admin.update({
        where: { id: parseInt(adminId) },
        data: { username, name, password },
      })
      res.status(200).json({ code: 200, message: "Succesfully updated admin" })
    } catch (error) {
      res.status(400).json({ code: 400, error })
    }
  }
}
