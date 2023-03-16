import { Paragraph } from "@/components/shared/Texts";

export const SelectedShowtimes = ({ selectedShowtimes, deselectShowtime }) => {
  return (
    <div className="my-4">
      <div className="my-4">
        <Paragraph size="xs">Selected Showtimes</Paragraph>
      </div>
      <div className="flex h-80 items-center justify-center overflow-y-scroll">
        {selectedShowtimes.length < 1 ? (
          <Paragraph size="sm">No Showtimes Selected</Paragraph>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-start gap-4">
            {selectedShowtimes.map((showtime, index) => (
              <div
                key={index}
                onClick={() => deselectShowtime(showtime.id)}
                className="tems-center flex h-10 w-full justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                <Paragraph size="xs">{showtime.time}</Paragraph>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
