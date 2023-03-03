import { Paragraph } from "@/components/shared/Texts";

export const SelectedMoviesAndShowtimes = ({
  selectedMovies,
  selectedShowtimes,
  deselectMovie,
  deselectShowtime,
}) => {
  return (
    <div className="my-2">
      <div className="my-4">
        <Paragraph size="xs">Selected Movies & Showtimes</Paragraph>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex h-72 w-6/12 flex-col items-center justify-center gap-4 p-2 text-center">
          {selectedMovies.length < 1 ? (
            <Paragraph size="xs">No Movies Selected</Paragraph>
          ) : (
            selectedMovies.map((selectedMovie, index) => (
              <button
                key={index}
                onClick={() => deselectMovie(selectedMovie.id)}
                className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                <Paragraph size="xs" style="medium">
                  {selectedMovie.title}
                </Paragraph>
              </button>
            ))
          )}
        </div>
        <div className="flex h-72 w-6/12 flex-col items-center justify-center gap-4 p-2 text-center">
          {selectedShowtimes.length < 1 ? (
            <Paragraph size="xs">No Showtimes Selected</Paragraph>
          ) : (
            selectedShowtimes.map((selectedShowtime, index) => (
              <div
                key={index}
                onClick={() => deselectShowtime(selectedShowtime)}
                className="flex h-10 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md"
              >
                <Paragraph size="xs" style="medium">
                  {selectedShowtime}
                </Paragraph>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
