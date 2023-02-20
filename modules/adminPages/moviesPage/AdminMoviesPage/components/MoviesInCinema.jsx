import DataContainer from "@/components/DataContainer";
import EllipsisVertical from "@/components/Icons/EllipsisVertical";
import MovieListCard from "@/components/MovieListCard";
import { useCinemaMovies } from "@/components/reactQuery/queries/Movie/useCinemaMovies";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import useToggle from "hooks/useToggle";
import MoviesInCinemaMenu from "./MoviesInCinemaMenu";

const MoviesInCinema = ({ region, cinema }) => {
  const [showMenu, toggleShowMenu] = useToggle(false);
  const fetchedCinemaMovies = useCinemaMovies({
    region: region,
    cinema: cinema,
  });

  return (
    <div className="w-full p-2 lg:w-5/6">
      <div className="my-2 flex items-center justify-between">
        <div className="w-2/6">
          <Subtitle size="xs">List of Movies</Subtitle>
        </div>
        <div className="relative">
          <button
            className="relative z-20 h-8 w-8 rounded-full bg-slate-100 shadow-md"
            onClick={toggleShowMenu}
          >
            <EllipsisVertical />
          </button>
          {showMenu && <MoviesInCinemaMenu />}
        </div>
      </div>
      <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="font-poppins w-2/12 text-center text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="font-poppins w-3/12 text-center text-xs text-slate-500">
          Picture
        </p>
        <p className="font-poppins w-4/12 text-center text-xs text-slate-500 lg:w-3/12">
          Name
        </p>
        <p className="font-poppins w-3/12 text-center text-xs text-slate-500 lg:w-2/12">
          Added On
        </p>
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-3 overflow-y-scroll"
        object="Movies"
        loading={false}
      >
        {fetchedCinemaMovies.data?.length < 1 ? (
          <Paragraph text="No Active Movies" size="sm" />
        ) : (
          fetchedCinemaMovies.data.map((movie, index) => (
            <MovieListCard
              key={index}
              movieTitle={movie.movieTitle}
              clickable
              onClick={() => selectMovie(index)}
            />
          ))
        )}
      </DataContainer>
    </div>
  );
};

export default MoviesInCinema;
