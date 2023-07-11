import { prisma } from "lib/prisma";

export default async function cinemaTransactionsHandler(req, res) {
  if (req.method === "GET") {
    const allTransactions = await prisma.transaction.findMany();
    res.status(200).json(allTransactions);
  }
}
