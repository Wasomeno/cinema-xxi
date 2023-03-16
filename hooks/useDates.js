import moment from "moment";

export function useDates(addition) {
  let dates = [];
  const momentNow = moment();
  for (let i = 0; i < addition; i++) {
    const momentFuture = momentNow.add({ days: i === 0 ? 0 : 1 });
    dates.push({ day: momentFuture.day(), date: momentFuture.date() });
  }
  return dates;
}
