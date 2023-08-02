import { useSkeleton } from "hooks/useSkeleton";
import { useUserConnectionDetails } from "hooks/useUserConnectionDetails";
import Image from "next/image";
import { useRouter } from "next/router";
import { useToast } from "stores/toastStore";

import { query } from "@/components/reactQuery/queries/query";
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys";

import { MovieSkeleton } from "./MovieSkeleton";

export const RegionMovies = ({ selectedRegion }) => {
  const moviesInRegion = query({
    queryKey: regionQueryKeys.regionMovies(selectedRegion.id),
    url: "/api/regions/" + selectedRegion.id + "/movies",
  });
  const { isConnected } = useUserConnectionDetails();
  const router = useRouter();
  const [, toastError] = useToast();

  const movieSkeletons = useSkeleton(<MovieSkeleton />, 5);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-full lg:w-5/6">
        <h2 className="text-sm md:text-base">Movies on Show</h2>
      </div>
      <div className="flex w-full justify-start gap-3 overflow-x-scroll lg:w-10/12">
        {moviesInRegion.isLoading
          ? movieSkeletons.map((skeleton) => skeleton)
          : moviesInRegion.data?.map((movie) => (
              <button
                key={movie.id}
                onClick={() =>
                  isConnected
                    ? router.push(`/app/${selectedRegion.id}/${movie.id}`)
                    : toastError("Connect your wallet first")
                }
                className="flex flex-col items-center gap-3"
              >
                <div className="relative rounded-lg h-48 w-36 bg-slate-200 shadow-sm lg:h-64 lg:w-48">
                  <Image
                    src={movie.image_url}
                    alt="movie-image"
                    className="rounded-lg"
                    fill
                  />
                </div>
                <span className="q w-32 text-center font-poppins text-xs tracking-wider lg:w-40 lg:text-sm">
                  {movie.title}
                </span>
              </button>
            ))}
      </div>
    </div>
  );
};
