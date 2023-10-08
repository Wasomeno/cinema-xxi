import { createContext, useContext, useState } from "react"

const TicketValueContext = createContext()
const TicketDispatchContext = createContext()

export function TicketContextProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState({})
  const [selectedShowtime, setSelectedShowtime] = useState({})
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seatsId, setSeatsId] = useState()

  return (
    <TicketValueContext.Provider
      value={{ selectedDate, selectedShowtime, selectedSeats, seatsId }}
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

export function useSelectedDate() {
  const { selectedDate } = useContext(TicketValueContext)
  const { setSelectedDate: selectDate } = useContext(TicketDispatchContext)

  return { selectDate, selectedDate }
}

export function useSelectedShowtime() {
  const { selectedShowtime } = useContext(TicketValueContext)
  const { setSelectedShowtime: selectShowtime } = useContext(
    TicketDispatchContext
  )

  return { selectedShowtime, selectShowtime }
}

export function useSelectedSeats() {
  const { selectedSeats } = useContext(TicketValueContext)
  const { setSelectedSeats } = useContext(TicketDispatchContext)

  function selectSeat(seat) {
    setSelectedSeats((currentSeats) => [...currentSeats, seat])
  }

  function deselectSeat(seat) {
    setSelectedSeats((currentSeats) =>
      currentSeats.filter((currentSeat) => currentSeat !== seat)
    )
  }

  return { selectedSeats, selectSeat, deselectSeat }
}

export function useSeatsId() {
  const { seatsId } = useContext(TicketValueContext)
  const { setSeatsId } = useContext(TicketDispatchContext)

  return { seatsId, setSeatsId }
}
