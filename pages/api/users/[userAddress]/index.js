import { prisma } from "lib/prisma";

export default async function userDetailsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const { userAddress } = req.query;
      const userDetails = await prisma.transaction.findMany({
        where: { user: userAddress.toString() },
        include: { cinema: true, movie: true, region: true },
      });
      const convertedDetails = userDetails.map((transaction) => ({
        ...transaction,
        showtime: transaction.showtime.toString(),
      }));
      res.status(200).json(convertedDetails);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
