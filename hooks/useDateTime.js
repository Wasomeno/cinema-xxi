export function useDateTime({ month = 0, date = 0, hours = 0, minutes = 0 }) {
  const dateTime = new Date();
  month && dateTime.setMonth(month);
  date && dateTime.setDate(date);
  hours && dateTime.setHours(hours);
  minutes && dateTime.setMinutes(minutes);
  dateTime.setSeconds(0);

  return dateTime;
}
