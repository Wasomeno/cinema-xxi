import { authOptions } from "lib/auth"
import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

export default async function deleteMoviesHandler(req, res) {
  if (req.method === "POST") {
    const { movieIds } = req.body
    const session = await getServerSession(req, res, authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.movie.deleteMany({ where: { id: { in: movieIds } } })
      res
        .status(200)
        .json({ code: "200", message: "Successfully Deleted Movies" })
    } catch (error) {
      await res.status(500).send(error.message)
    }
  }
}
