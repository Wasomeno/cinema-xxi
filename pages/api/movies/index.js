import { prisma } from "lib/prisma"

export default async function moviesHandler(req, res) {
  if (req.method === "GET") {
    const movies = await prisma.movie.findMany()
    res.status(200).json(movies)
  } else if (req.method === "POST") {
    const { title, image_url } = req.body
    try {
      await prisma.movie.createMany({
        data: { title, image_url },
      })
      res.status(200).json({ code: "200", message: "Successfully Added Movie" })
    } catch (error) {
      await res.status(500).send(error.message)
    }
  }
}
