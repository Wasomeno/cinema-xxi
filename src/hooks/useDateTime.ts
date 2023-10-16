type DateTimeProps = {
  month?: number | 0
  date?: number | 0
  hours?: number | 0
  minutes?: number | 0
}

export function useDateTime(props?: DateTimeProps) {
  const dateTime = new Date()
  props?.month && dateTime.setMonth(props.month)
  props?.date && dateTime.setDate(props.date)
  props?.hours && dateTime.setHours(props.hours)
  props?.minutes && dateTime.setMinutes(props.minutes)
  dateTime.setSeconds(0)

  return dateTime
}
