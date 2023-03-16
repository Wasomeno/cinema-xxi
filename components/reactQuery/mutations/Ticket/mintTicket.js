import { useMutation } from "@tanstack/react-query";
import { parseEther } from "ethers/lib/utils.js";
import { ticketContract } from "hooks/createContract";
import { useUserDetails } from "hooks/useUserDetails";
import { useMoviePageValueContext } from "modules/appPages/moviePage/components/context/appMoviePageContext";
import moment from "moment";
import { useWaitForTransaction } from "wagmi";

import { createSideEffects } from "../createSideEffects";

export function mintTicket({ total }) {
  const { seatsId, selectedDate, selectedSeats, selectedShowtime, router } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMoviePageValueContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUserDetails();
  const contract = ticketContract();
  const dayOfWeek = moment().day();
  // const ticketShowtime = moment().startOf("day").add({ seconds: time });
  const sideEffects = createSideEffects({
    context: "mint",
    object: "tickets",
    redirect: true,
    redirectUrl: "/app",
  });

  const ticketDetails = {
    _day: dayOfWeek,
    _region: router.query.regionId,
    _cinema: selectedShowtime.cinema.id,
    _studio: selectedShowtime.studio.studio,
    _showtime: selectedShowtime.time,
    _movie: selectedShowtime.movie.id,
  };

  const totalParsed = parseEther(total.toString());

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mintTicketMutation = useMutation(async () => {
    const mintTicket = await contract.mintTickets(
      ticketDetails,
      selectedSeats,
      {
        value: totalParsed,
      }
    );
    const waitForTicketMint = await useWaitForTransaction({
      hash: mintTicket.hash,
    }).then(async () => {
      const result = await fetch("/api/tickets/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedDate: selectedDate,
          regionId: parseInt(router.query.regionId),
          studio: parseInt(selectedShowtime.studio.studio),
          movieId: parseInt(selectedShowtime.movie.id),
          showtime: selectedShowtime,
          cinemaId: parseInt(selectedShowtime.cinema.id),
          seatsId: seatsId,
          seatNumbers: selectedSeats,
          ticketIds: ["test1", "test2"],
          total: total,
          userAddress: user,
        }),
      });
      if (!result.ok) {
        throw new Error("Mutation Error", {
          cause: result,
        });
      }

      return waitForTicketMint;
    });
  }, sideEffects);
  return mintTicketMutation;
}
