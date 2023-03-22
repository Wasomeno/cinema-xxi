import Link from "next/link";
import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import ChevronLeft from "@/components/Icons/ChevronLeft";
import { useCinemaDetails } from "@/components/reactQuery/queries/Cinema/useCinemaDetails";

export const CinemaMoviesPage = () => {
  const { query, back } = useRouter();
  const cinemaDetails = useCinemaDetails(query.cinemaId);

  return (
    <AnimatedContainer className="h-screen overflow-y-scroll p-4">
      <div className="my-2 w-full">
        <div className="grid w-full grid-cols-5 items-center justify-center gap-2">
          <div className="col-span-1 text-center">
            <button
              onClick={back}
              className="h-8 w-8 rounded-full bg-slate-100 shadow-md"
            >
              <ChevronLeft color="black" size="4" />
            </button>
          </div>
          <span className="col-span-3 col-start-2 col-end-5 text-center font-poppins text-sm">
            {cinemaDetails.data?.name}
          </span>
        </div>
      </div>
      <DataContainer
        object="movies"
        loading={cinemaDetails.isLoading}
        className="mt-4"
      >
        <div className="flex w-full flex-col items-center justify-start gap-2">
          {cinemaDetails.data?.movie.length < 1 ? (
            <div className="flex h-40 items-center justify-center">
              <p className="font-poppins text-xs">No Active Movies</p>
            </div>
          ) : (
            cinemaDetails.data?.movie.map((movie) => (
              <Link
                key={movie.id}
                href={"/app/" + cinemaDetails.data?.regionId + "/" + movie.id}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-100 p-2"
              >
                <div className="h-40 w-4/12 rounded-lg bg-slate-500" />
                <div className="w-8/12">
                  <p className="font-poppins text-sm">{movie.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </DataContainer>
    </AnimatedContainer>
  );
};
