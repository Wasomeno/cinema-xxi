import Image from "next/image"
import Link from "next/link"

import { prisma } from "@/lib/prisma"
import { AnimatedContainer } from "@/components/animated-container"

type CinemaPageProps = {
  params: { cinemaId: string }
}

export default async function CinemaPage({ params }: CinemaPageProps) {
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      cinema_movie: {
        select: { movies: true },
      },
    },
  })

  return (
    <AnimatedContainer className="flex-1 py-2.5 lg:py-10">
      <div className="sticky top-[59px] flex items-center gap-2 bg-white px-5 py-2.5 dark:bg-slate-950 lg:static lg:mb-2.5 lg:px-10">
        <h1 className="font-poppins text-sm font-semibold lg:text-3xl">
          {cinemaDetails?.name}
        </h1>
      </div>
      <div className="px-5 py-2 lg:px-10">
        <div className="flex w-full flex-col gap-2">
          {!cinemaDetails?.cinema_movie?.movies.length ? (
            <div className="flex h-40 items-center justify-center">
              <p className="font-poppins text-xs lg:text-sm">
                No Active Movies
              </p>
            </div>
          ) : (
            cinemaDetails?.cinema_movie?.movies.map((movie) => (
              <Link
                key={movie.id}
                href={"/app/" + cinemaDetails.regionId + "/" + movie.id}
                className="flex w-full items-center gap-4 rounded-md border bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-900 lg:w-2/6"
              >
                <Image
                  src={movie.image_url}
                  alt="movie-image"
                  className="rounded-md"
                  height={128}
                  width={120}
                />
                <div className="w-8/12">
                  <p className="font-poppins text-sm">{movie.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AnimatedContainer>
  )
}
