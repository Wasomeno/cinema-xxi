import { PrismaClient } from "@prisma/client";

export default async function movieDetailsHandler(req, res) {
  const { movieId } = req.query;
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const movieDetails = await prisma.movie.findUnique({
      where: { id: parseInt(movieId) },
    });
    res.status(200).json(movieDetails);
  }
}
