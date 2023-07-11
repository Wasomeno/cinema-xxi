import { prisma } from "lib/prisma";

export default async function deleteMoviesHandler(req, res) {
  if (req.method === "POST") {
    const { movieIds } = req.body;
    try {
      await prisma.movie.deleteMany({ where: { id: { in: movieIds } } });
      res
        .status(200)
        .json({ code: "200", message: "Successfully Deleted Movies" });
    } catch (error) {
      await res.status(500).send(error.message);
    }
  }
}
