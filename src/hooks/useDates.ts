import moment from "moment"

export type TDate = {
  day: string
  value: number
  month: number
}

export function useDates(amount: number): TDate[] {
  let dates = []
  const timeNow = moment()
  for (let i = 0; i < amount; i++) {
    const timeAdded = timeNow.add({ day: i + 1 - 1 })

    const dayOfTime = timeAdded.format("ddd")

    dates.push({
      day: dayOfTime,
      value: timeAdded.date(),
      month: timeAdded.month(),
    })
  }
  return dates
}
