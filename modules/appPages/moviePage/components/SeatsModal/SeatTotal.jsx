import moment from "moment";

import { Paragraph } from "@/components/shared/Texts";

import {
  useMoviePageActionContext,
  useMoviePageValueContext,
} from "../context/appMoviePageContext";

const SeatTotal = () => {
  const { deselectSeat, setModalState } = useMoviePageActionContext();
  const { selectedSeats, selectedDate } = useMoviePageValueContext();
  const dayOfWeek = moment({ date: selectedDate }).day();

  function getTotal() {
    const total = selectedSeats.length * (dayOfWeek > 5 ? 0.0012 : 0.001);
    return selectedSeats.length < 1 ? 0 : total;
  }
  return (
    <div className="fixed bottom-4 left-1/2 flex h-44 w-5/6 -translate-x-1/2 flex-col justify-around rounded-md border-2 border-blue-100 p-2 shadow-md">
      <div className="flex h-4/6 items-start justify-center">
        <div className="w-6/12">
          <div className="mb-2 text-center">
            <Paragraph size="xs" style="medium">
              Total
            </Paragraph>
          </div>
          <div className="text-center">
            <Paragraph size="xs">{getTotal() + " ETH"}</Paragraph>
          </div>
        </div>
        <div className="w-6/12">
          <div className="mb-2 text-center">
            <Paragraph size="xs" style="medium">
              Selected Seats
            </Paragraph>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {selectedSeats.length < 1 ? (
              <Paragraph size="xs">No Seats Selected</Paragraph>
            ) : (
              selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-400"
                  onClick={() => deselectSeat(seat)}
                >
                  <Paragraph size="xs">{seat}</Paragraph>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          disabled={selectedSeats.length < 1}
          onClick={() => {
            setModalState("ticket");
          }}
          className="w-3/6 rounded-md bg-slate-900 p-2 font-poppins text-xs text-white disabled:bg-slate-500 disabled:text-slate-400"
        >
          Confirm Tickets
        </button>
      </div>
    </div>
  );
};

export default SeatTotal;
