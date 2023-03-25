import { Paragraph } from "@/components/shared/Texts";

export const SelectedShowtimes = ({ selectedShowtimes, deselectShowtime }) => {
  return (
    <div className="w-full">
      <div className="my-4">
        <Paragraph size="xs">Selected Showtimes</Paragraph>
      </div>
      {selectedShowtimes.length < 1 && (
        <div className="flex h-40 items-center justify-center overflow-y-scroll">
          <p className="font-poppins text-xs ">No Showtimes Selected</p>
        </div>
      )}
      {selectedShowtimes.length > 0 && (
        <div className="flex h-40 w-full flex-col items-center justify-start gap-4">
          {selectedShowtimes.map((showtime, index) => (
            <div
              key={index}
              onClick={() => deselectShowtime(showtime.id)}
              className="tems-center flex w-full justify-evenly rounded-md bg-slate-200 p-3 shadow-md"
            >
              <Paragraph size="xs">{showtime.time}</Paragraph>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
