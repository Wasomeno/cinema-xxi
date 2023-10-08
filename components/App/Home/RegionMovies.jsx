import Image from "next/image"
import { useRouter } from "next/router"
import { useSkeleton } from "hooks/useSkeleton"
import { TbMovieOff } from "react-icons/tb"
import { useToast } from "stores/toastStore"
import { useAccount } from "wagmi"

import { MovieSkeleton } from "@/components/MovieSkeleton"
import { query } from "@/components/reactQuery/queries/query"
import { regionQueryKeys } from "@/components/reactQuery/queries/queryKeys/regionQueryKeys"

export const RegionMovies = () => {
  const { query: routerQuery } = useRouter()

  const moviesInRegion = query({
    queryKey: regionQueryKeys.regionMovies(routerQuery?.region ?? "1"),
    url: `/api/regions/${routerQuery?.region ?? "1"} /movies`,
  })

  const router = useRouter()
  const toast = useToast()

  const { isConnected } = useAccount()
  const movieSkeletons = useSkeleton(<MovieSkeleton />, 6)

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-full lg:w-5/6">
        <h2 className="text-sm font-medium md:text-base">Movies on Show</h2>
      </div>
      <div className="flex w-full justify-start gap-3 overflow-x-scroll lg:w-10/12">
        {moviesInRegion.isLoading && movieSkeletons.map((skeleton) => skeleton)}
        {!moviesInRegion.isLoading && moviesInRegion.data?.length > 0
          ? moviesInRegion.data?.map((movie) => (
              <button
                key={movie.id}
                onClick={() =>
                  isConnected
                    ? router.push(
                        `/app/${routerQuery?.region ?? 1}/${movie.id}`
                      )
                    : toast.error("Connect your wallet first")
                }
                className="flex flex-col items-center gap-3"
              >
                <div className="relative h-48 w-36 rounded-lg bg-slate-200 shadow-sm lg:h-64 lg:w-48">
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
            ))
          : null}
        {!moviesInRegion.isLoading && moviesInRegion.data?.length < 1 ? (
          <div className="flex h-52 w-full flex-col items-center justify-center gap-2 opacity-50">
            <span className="text-xs font-medium lg:text-sm">
              No Active movies
            </span>
            <TbMovieOff className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
