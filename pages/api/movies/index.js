import { prisma } from "lib/prisma"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"

export default async function moviesHandler(req, res) {
  if (req.method === "GET") {
    const movies = await prisma.movie.findMany()
    res.status(200).json(movies)
  } else if (req.method === "POST") {
    const { id, title, image_url } = req.body
    const session = await getServerSession(authOptions)
    try {
      if (session.user.role !== "manager" || !session) {
        res.status(500).json({ status: 500, message: "Session Invalid" })
      }
      await prisma.movie.create({
        data: { id, title, image_url },
      })
      res.status(200).json({ code: "200", message: "Successfully Added Movie" })
    } catch (error) {
      await res.status(500).send(error.message)
    }
  }
}
