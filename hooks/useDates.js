import moment from "moment";

export function useDates(addition) {
  let dates = [];
  const timeNow = moment();
  for (let i = 0; i < addition; i++) {
    const timeAdded = timeNow.add({ days: i === 0 ? 0 : 1 });
    const dayOfTime = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(timeAdded);

    dates.push({
      day: dayOfTime,
      date: timeAdded.date(),
      month: timeAdded.month(),
    });
  }
  return dates;
}
