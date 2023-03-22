import { prisma } from "lib/prisma";

export default async function transactionDetails(req, res) {
  if (req.method === "GET") {
    const { transactionId } = req.query;
    const transactionDetails = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: { cinema: true, movie: true, region: true },
    });
    res.status(200).json({
      ...transactionDetails,
      showtime: transactionDetails.showtime.toString(),
    });
  }
}
