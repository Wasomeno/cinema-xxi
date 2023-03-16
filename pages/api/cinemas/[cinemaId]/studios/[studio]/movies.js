import { prisma } from "lib/prisma";

export default async function studioMoviesHandler(req, res) {
  if (req.method === "GET") {
  } else if (req.method === "POST") {
    const { showtimeId, movieId } = req.body;
    try {
      await prisma.showtime.update({
        where: { id: showtimeId },
        data: {
          movie: { connect: { id: movieId } },
        },
      });
      res.status(200).json({ code: 200, text: "Successfully added new movie" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
