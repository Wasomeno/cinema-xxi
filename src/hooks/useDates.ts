import moment from "moment"

export type Time = {
  day: string
  date: number
  month: number
}

export function useDates(addition: number): Time[] {
  let dates = []
  const timeNow = moment()
  for (let i = 0; i < addition; i++) {
    const timeAdded = timeNow.add({ days: i === 0 ? 0 : 1 })
    const dayOfTime = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(timeAdded.date())

    dates.push({
      day: dayOfTime,
      date: timeAdded.date(),
      month: timeAdded.month(),
    })
  }
  return dates
}
