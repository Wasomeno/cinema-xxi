import { Prisma } from "@prisma/client"
import { create } from "zustand"

import { TDate } from "@/hooks/useDates"

export type StudioShowtime = Prisma.ShowtimeToMovieGetPayload<{
  include: {
    showtime: true
    movie: true
    studio: { include: { cinema: true } }
  }
}>

const selectedSeatsStore = create<{
  selectedSeats: number[]
  selectSeat: (seat: number) => void
  deselectSeat: (seat: number) => void
}>((set) => ({
  selectedSeats: [],
  selectSeat: (seat) =>
    set((state) => ({ selectedSeats: [...state.selectedSeats, seat] })),
  deselectSeat: (seat) =>
    set((state) => ({
      selectedSeats: state.selectedSeats?.filter(
        (currentSeat) => currentSeat !== seat
      ),
    })),
}))

const selectedDateStore = create<{
  selectedDate?: TDate
  selectDate: (date: TDate) => void
}>((set) => ({ selectDate: (date) => set({ selectedDate: date }) }))

const selectedShowtimeStore = create<{
  selectedShowtime?: StudioShowtime
  selectShowtime: (showtime: StudioShowtime) => void
}>((set) => ({
  selectShowtime: (showtime) => set({ selectedShowtime: showtime }),
}))

const seatsIdStore = create<{
  seatsId: number
  setSeatsId: (seatsId: number) => void
}>((set) => ({
  seatsId: 0,
  setSeatsId: (seatsId) => set({ seatsId }),
}))

export const useSelectedSeats = () =>
  selectedSeatsStore((state) => ({
    selectedSeats: state.selectedSeats,
    selectSeat: state.selectSeat,
    deselectSeat: state.deselectSeat,
  }))

export const useSelectedShowtime = () =>
  selectedShowtimeStore((state) => ({
    selectedShowtime: state.selectedShowtime,
    selectShowtime: state.selectShowtime,
  }))

export const useSelectedDate = (date?: TDate) =>
  selectedDateStore((state) => ({
    selectedDate: state.selectedDate ?? date,
    selectDate: state.selectDate,
  }))

export const useSeatsId = () =>
  seatsIdStore((state) => ({
    seatsId: state.seatsId,
    setSeatsId: state.setSeatsId,
  }))
