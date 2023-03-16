import { useDates } from "hooks/useDates";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";

import { ContextAction, ContextValue } from "./appMoviePageContext";

const { useState, useMemo } = require("react");

export const AppMoviePageProvider = ({ children }) => {
  const datesDetails = useDates(5);
  const router = useRouter();
  const [selectedShowtime, setSelectedShowtime] = useState(0);
  const [seatsId, setSeatsId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(datesDetails[0].date);
  const [modalState, setModalState] = useState("");
  const [selectedSeats, selectSeat, deselectSeat, clearSeats] =
    useSelectDeselect([]);

  return (
    <ContextAction.Provider
      value={{
        setSelectedShowtime: setSelectedShowtime,
        setSelectedDate: setSelectedDate,
        setModalState: setModalState,
        setSeatsId: setSeatsId,
        selectSeat: selectSeat,
        deselectSeat: deselectSeat,
        clearSeats: clearSeats,
      }}
    >
      <ContextValue.Provider
        value={{
          seatsId: seatsId,
          datesDetails: datesDetails,
          selectedShowtime: selectedShowtime,
          selectedDate: selectedDate,
          modalState: modalState,
          selectedSeats: selectedSeats,
          router: router,
        }}
      >
        {children}
      </ContextValue.Provider>
    </ContextAction.Provider>
  );
};
