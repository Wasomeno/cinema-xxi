import { useSelectDeselect } from "hooks/useSelectDeselect";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import DataContainer from "@/components/DataContainer";
import { useCinemaMovies } from "@/components/reactQuery/queries/Cinema/useCinemaMovies";
import { Paragraph } from "@/components/shared/Texts";

const CinemaMovieList = ({ deleteMode, toggleDeleteMode }) => {
  const router = useRouter();
  const cinemaMovies = useCinemaMovies();
  const [moviesToDelete, selectMoviesToDelete, deselectMoviesToDelete] =
    useSelectDeselect([]);

  const DeleteModal = dynamic(() => import("./DeleteMoviesModal"));

  return (
    <>
      <div className="my-1 mb-2 flex items-center justify-evenly border-b border-b-slate-600 p-2">
        <p className="w-2/12 text-center font-poppins text-xs text-slate-500 lg:w-1/12">
          Id
        </p>
        <p className="w-3/12 text-center font-poppins text-xs text-slate-500">
          Picture
        </p>
        <p className="w-4/12 text-center font-poppins text-xs text-slate-500 lg:w-3/12">
          Name
        </p>
        <p className="w-3/12 text-center font-poppins text-xs text-slate-500 lg:w-2/12">
          Added On
        </p>
      </div>
      <DataContainer
        className="flex flex-col items-center justify-start gap-3"
        object="Movies"
        loading={cinemaMovies.isLoading}
      >
        {cinemaMovies.data?.movie < 1 ? (
          <div className="flex h-72 items-center">
            <Paragraph size="sm">No Active Movies</Paragraph>
          </div>
        ) : (
          cinemaMovies.data?.movie.map((movie) => (
            <button
              key={movie.id}
              onClick={() =>
                deleteMode
                  ? selectMoviesToDelete(movie.id)
                  : router.push("/manager/movies/" + movie.id)
              }
              className={
                (moviesToDelete.includes(movie.id) && deleteMode
                  ? "bg-red-300 "
                  : "") +
                "relative flex w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md transition duration-150 hover:scale-105 lg:w-full"
              }
            >
              <div className="w-2/12 text-center lg:w-1/12">
                <p className="p-2 font-poppins text-xs font-medium lg:text-sm">
                  {movie.id}
                </p>
              </div>
              <div className="hidden w-3/12 justify-center lg:flex">
                <div className="h-24 w-20 rounded-lg bg-slate-900" />
              </div>
              <div className="w-4/12 text-center lg:w-3/12">
                <p className="p-2 font-poppins text-xs font-medium lg:text-sm">
                  {movie.title}
                </p>
              </div>
              <div className="w-3/12 text-center lg:w-2/12">
                <p className="p-2 font-poppins text-xs font-medium lg:text-sm">
                  Added On
                </p>
              </div>
              {moviesToDelete.includes(movie.id) && deleteMode && (
                <button
                  onClick={() => deselectMoviesToDelete(movie.id)}
                  className="flex-items-center absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full bg-slate-50 font-poppins text-xs font-medium shadow-md"
                >
                  X
                </button>
              )}
            </button>
          ))
        )}
      </DataContainer>
      {deleteMode && (
        <DeleteModal
          toggleDeleteMode={toggleDeleteMode}
          objectToDelete={moviesToDelete}
          object="movie"
        />
      )}
    </>
  );
};

export default CinemaMovieList;
