"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/stores/toastStore"
import { Movie } from "@prisma/client"
import { TbMovieOff } from "react-icons/tb"
import { useAccount } from "wagmi"

export function RegionMovies({ movies }: { movies: Movie[] }) {
  const searchParams = useSearchParams()

  const region = searchParams.get("region") ?? "1"

  const router = useRouter()
  const toast = useToast()

  const { isConnected } = useAccount()

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-full lg:w-5/6">
        <h2 className="text-sm font-medium md:text-base">Movies on Show</h2>
      </div>
      <div className="flex w-full justify-start gap-3 overflow-x-scroll lg:w-10/12">
        {(movies.length as number) > 0
          ? movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() =>
                  isConnected
                    ? router.push(`/app/movies/${movie.id}/${region}`)
                    : toast.error("Connect your wallet first")
                }
                className="flex cursor-pointer flex-col items-center gap-3"
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
              </div>
            ))
          : null}
        {(movies.length as number) < 1 ? (
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
