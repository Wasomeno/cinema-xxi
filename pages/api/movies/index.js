import { prisma } from "lib/prisma";

export default async function moviesHandler(req, res) {
  if (req.method === "GET") {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } else if (req.method === "POST") {
    const { title, duration, synopsis, cast } = req.body;
    try {
      await prisma.movie.create({
        data: {
          synopsis: synopsis,
          casts: cast,
          title: title,
          duration: parseInt(duration),
          watchedAmount: 0,
        },
      });
      res.status(200).json({ code: "200", text: "Successfully Added Movie" });
    } catch (error) {
      await res.status(500).send(error);
    }
  } else if (req.method === "DELETE") {
    const { movieIds } = req.body;
    try {
      await prisma.movie.deleteMany({ where: { id: { in: movieIds } } });
      res.status(200).json({
        code: "200",
        text: "Successfully deleted movies",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
