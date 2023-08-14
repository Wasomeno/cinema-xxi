import { prisma } from "lib/prisma"

export default async function searchHandler(req, res) {
  const { query } = req.query
  if (req.method === "GET") {
    const cinemaResult = prisma.cinema.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
    })

    const movieResult = prisma.movie.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
    })

    const result = await Promise.all([cinemaResult, movieResult])

    res.status(200).json({ cinemas: result[0], movies: result[1] })
  }
}
