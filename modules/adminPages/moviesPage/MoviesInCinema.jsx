import { Paragraph } from "@/components/shared/Texts";
import { parseBytes32String } from "ethers/lib/utils.js";
import { MoonLoader } from "react-spinners";
import { useCinemaMovies } from "@/components/reactQuery/queries/Movie/useCinemaMovies";

const MoviesInCinema = ({ region, cinema }) => {
  const fetchedCinemaMovies = useCinemaMovies({
    region: region,
    cinema: cinema,
  });

  return (
    <div className="w-full p-2">
      <div className="">
        <Paragraph text="List of Movies" size="sm" style="medium" />
      </div>
      <div className="flex flex-col gap-3 items-center h-4/6 overflow-y-scroll p-2">
        {fetchedCinemaMovies.isLoading ? (
          <>
            <Paragraph text="Fetching Movies" size="xs" style="medium" />
            <MoonLoader
              loading={fetchedCinemaMovies.isLoading}
              size={25}
              color={"black"}
            />
          </>
        ) : fetchedCinemaMovies.data.length < 1 ? (
          <Paragraph text="No Active Movies" size="sm" />
        ) : (
          fetchedCinemaMovies.data.map((movie, index) => (
            <button
              key={index}
              onClick={() => selectMovie(index)}
              className="font-poppins font-normal text-center text-sm p-2 shadow-md bg-slate-200 rounded-lg w-5/6 transition duration-300 ease-in-out hover:bg-white"
            >
              {parseBytes32String(movie)}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesInCinema;
