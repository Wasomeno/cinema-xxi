import { prisma } from "lib/prisma";

export default async function movieDetailsHandler(req, res) {
  const { movieId } = req.query;
  if (req.method === "GET") {
    const movieDetails = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    res.status(200).json(movieDetails);
  } else if (req.method === "PUT") {
    const { title, duration, synopsis, casts } = req.body;
    try {
      await prisma.movie.update({
        where: { id: parseInt(movieId) },
        data: { title, synopsis, casts, duration: parseInt(duration) },
      });
      res
        .status(200)
        .json({ code: "200", message: "Successfully Updated Movie" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
