"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { Prisma } from "@prisma/client"

import { Time } from "@/hooks/useDates"

export type StudioShowtime = Prisma.ShowtimeToMovieGetPayload<{
  include: {
    showtime: true
    movie: true
    studio: { include: { cinema: true } }
  }
}>

type TicketValue = {
  selectedDate: Time
  selectedShowtime: StudioShowtime
  selectedSeats: number[]
  seatsId: number
}

type TicketDispatch = {
  setSelectedDate: Dispatch<SetStateAction<Time>>
  setSelectedShowtime: Dispatch<SetStateAction<StudioShowtime>>
  setSelectedSeats: Dispatch<SetStateAction<number[]>>
  setSeatsId: Dispatch<SetStateAction<number>>
}

const TicketValueContext = createContext<TicketValue | undefined>(undefined)
const TicketDispatchContext = createContext<TicketDispatch | undefined>(
  undefined
)

export function TicketContextProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Time>({
    date: 0,
    day: "0",
    month: 0,
  })

  const [selectedShowtime, setSelectedShowtime] = useState<StudioShowtime | {}>(
    {}
  )
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [seatsId, setSeatsId] = useState(0)

  return (
    <TicketValueContext.Provider
      value={{
        selectedDate,
        selectedShowtime: selectedShowtime as StudioShowtime,
        selectedSeats,
        seatsId,
      }}
    >
      <TicketDispatchContext.Provider
        value={{
          setSelectedDate,
          setSelectedShowtime,
          setSelectedSeats,
          setSeatsId,
        }}
      >
        {children}
      </TicketDispatchContext.Provider>
    </TicketValueContext.Provider>
  )
}

export function useSelectedDate(date?: Time) {
  const valueContext = useContext(TicketValueContext)
  const dispatchContext = useContext(TicketDispatchContext)

  useEffect(() => {
    if (date) {
      dispatchContext?.setSelectedDate(date)
    }
  }, [])

  return {
    selectedDate: valueContext?.selectedDate,
    setSelectedDate: dispatchContext?.setSelectedDate,
  }
}

export function useSelectedShowtime() {
  const valueContext = useContext(TicketValueContext)
  const dispatchContext = useContext(TicketDispatchContext)
  return {
    selectedShowtime: valueContext?.selectedShowtime,
    setSelectedShowtime: dispatchContext?.setSelectedShowtime,
  }
}

export function useSelectedSeats() {
  const valueContext = useContext(TicketValueContext)
  const dispatchContext = useContext(TicketDispatchContext)

  function selectSeat(seat: number) {
    dispatchContext?.setSelectedSeats((currentSeats) => [...currentSeats, seat])
  }

  function deselectSeat(seat: number) {
    dispatchContext?.setSelectedSeats((currentSeats) =>
      currentSeats.filter((currentSeat) => currentSeat !== seat)
    )
  }

  return {
    selectedSeats: valueContext?.selectedSeats,
    selectSeat,
    deselectSeat,
  }
}

export function useSeatsId() {
  const valueContext = useContext(TicketValueContext)
  const dispatchContext = useContext(TicketDispatchContext)

  return {
    seatsId: valueContext?.seatsId,
    setSeatsId: dispatchContext?.setSeatsId,
  }
}
