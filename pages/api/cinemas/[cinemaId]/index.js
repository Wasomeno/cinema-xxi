import { PrismaClient } from "@prisma/client";

export default async function cinemaDetailsHandler(req, res) {
  const prisma = new PrismaClient();
  const { cinemaId } = req.query;
  if (req.method === "GET") {
    const cinemaDetails = await prisma.cinema.findUnique({
      where: { id: parseInt(cinemaId) },
      include: {
        movie: { include: { cinema: true, showtime: true } },
        region: true,
        studio: true,
        showtimes: true,
        transactions: true,
      },
    });
    res.status(200).json({
      ...cinemaDetails,
      transactions: cinemaDetails.transactions.map((transaction) => ({
        ...transaction,
        showtime: transaction.showtime.toString(),
      })),
    });
  } else if (req.method === "PATCH") {
    const { cinemaName } = req.body;
    try {
      await prisma.cinema.update({
        where: { id: parseInt(cinemaId) },
        data: { name: cinemaName },
      });
      res
        .status(200)
        .json({ code: 200, message: "Successfully updated cinema" });
    } catch (error) {
      res.status(500).json({ code: 500, error });
    }
  }
}
