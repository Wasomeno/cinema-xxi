import Link from "next/link";
import { useRouter } from "next/router";

import AnimatedContainer from "@/components/AnimatedContainer";
import ChevronLeft from "@/components/Icons/ChevronLeft";

export const CinemaMoviesPage = ({ cinemaDetails }) => {
  const { back } = useRouter();
  return (
    <AnimatedContainer className="flex h-screen justify-center overflow-y-scroll p-4">
      <div className="w-full lg:w-4/6">
        <div className="my-2">
          <div className="grid w-full grid-cols-7 items-center justify-center gap-2">
            <div className="col-span-1 text-center">
              <button
                onClick={back}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shadow-md"
              >
                <ChevronLeft color="stroke-slate-800" size="4" />
              </button>
            </div>
            <span className="col-span-3 col-start-2 col-end-7 text-center font-poppins text-sm">
              {cinemaDetails.name}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex w-full flex-col items-center justify-start gap-2">
            {cinemaDetails.movie.length < 1 ? (
              <div className="flex h-40 items-center justify-center">
                <p className="font-poppins text-xs lg:text-sm">
                  No Active Movies
                </p>
              </div>
            ) : (
              cinemaDetails.movie.map((movie) => (
                <Link
                  key={movie.id}
                  href={"/app/" + cinemaDetails.regionId + "/" + movie.id}
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
        </div>
      </div>
    </AnimatedContainer>
  );
};
