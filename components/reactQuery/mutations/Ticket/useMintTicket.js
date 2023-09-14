import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
import { waitForTransaction } from "@wagmi/core"
import { parseEther } from "ethers"
import { ticketContract } from "hooks/createContract"
import { useAccount } from "wagmi"

import { useSideEffects } from "../useSideEffects"

export function useMintTicket({
  seatsId,
  selectedDate,
  selectedSeats,
  selectedShowtime,
  total,
}) {
  const { address } = useAccount()
  const router = useRouter()
  // const totalParsed = parseEther(total.toString())
  // const ticketDetails = {
  //   _day: dayOfWeek,
  //   _region: router.query.regionId,
  //   _cinema: selectedShowtime.cinema.id,
  //   _studio: selectedShowtime.studio.studio,
  //   _showtime: selectedShowtime.time,
  //   _movie: selectedShowtime.movie.id,
  // }

  const sideEffects = useSideEffects({
    text: "Minting tickets",
    redirectUrl: "/app",
  })

  const mintTicketMutation = useMutation(async () => {
    // const mintTicket = await ticketContract.write({
    //   functionName: "mintTickets",
    //   args: [
    //     ticketDetails,
    //     selectedSeats,
    //     {
    //       value: totalParsed,
    //     },
    //   ],
    // })
    // await waitForTransaction({
    //   hash: mintTicket.hash,
    // })
    const databaseTicketDetails = await fetch("/api/tickets/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress: address,
        selectedDate,
        regionId: parseInt(router.query.regionId),
        cinemaId: parseInt(selectedShowtime.cinema.id),
        movieId: selectedShowtime.movie.id,
        showtime: selectedShowtime,
        studio: parseInt(selectedShowtime.studio.studio),
        seatsId,
        seatNumbers: selectedSeats,
        ticketIds: ["test1", "test2"],
        total,
      }),
    })
    if (!databaseTicketDetails.ok) {
      throw new Error("Mutation Error", {
        error: await databaseTicketDetails.json(),
      })
    }
    return databaseTicketDetails
  }, sideEffects)

  return mintTicketMutation
}
