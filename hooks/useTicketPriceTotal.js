export function useTicketPriceTotal(day, seatsAmount) {
  const total = seatsAmount * (day > 5 ? 0.0012 : 0.001);
  return seatsAmount < 1 ? 0 : total;
}
