import { Paragraph } from "@/components/shared/Texts";

export const SelectedMoviesAndShowtimes = ({
  selectedMovie,
  selectedShowtime,
  deselectMovie,
  deselectShowtime,
}) => {
  return (
    <div className="w-full">
      <div className="mb-42">
        <Paragraph size="xs">Selected Movie & Showtimes</Paragraph>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex h-40 w-6/12 flex-col items-center justify-center gap-4 p-2 text-center">
          {!selectedMovie ? (
            <Paragraph size="xs">No Movie Selected</Paragraph>
          ) : (
            <button
              onClick={deselectMovie}
              className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
            >
              <Paragraph size="xs" style="medium">
                {selectedMovie.title}
              </Paragraph>
            </button>
          )}
        </div>
        <div className="flex h-40 w-6/12 flex-col items-center justify-center gap-4 p-2 text-center">
          {!selectedShowtime ? (
            <Paragraph size="xs">No Showtime Selected</Paragraph>
          ) : (
            <div
              onClick={deselectShowtime}
              className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
            >
              <Paragraph size="xs" style="medium">
                {selectedShowtime.time}
              </Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
