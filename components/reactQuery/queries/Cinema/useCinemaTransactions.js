import { transactionsContract } from "../../../../hooks/useContract";

export const useCinemaTransactions = async ({ region, cinema }) => {
  const contract = transactionsContract({ read: true });
  const transactions = await contract.getCinemaTransactionsDetails(
    region,
    cinema
  );
  const ethGained = transactions.reduce(
    (accumulator, value) => accumulator + parseInt(value.priceTotal),
    0
  );
  return { transactionsAmount: transactions.length, ethGained: ethGained };
};
