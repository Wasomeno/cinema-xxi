import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { prisma } from "lib/prisma"
import { BsArrowLeftShort } from "react-icons/bs"

import AnimatedContainer from "@/components/AnimatedContainer"
import AppLayout from "@/components/Layouts/AppLayout"

export async function getStaticPaths() {
  const cinemas = await prisma.cinema.findMany()
  const cinemaPaths = cinemas.map((cinema) => ({
    params: { cinemaId: cinema.id.toString() },
  }))

  return { paths: cinemaPaths, fallback: "blocking" }
}

export async function getStaticProps(context) {
  const { params } = context
  const cinemaDetails = await prisma.cinema.findUnique({
    where: { id: parseInt(params.cinemaId) },
    include: {
      cinema_movie: {
        select: { movies: true },
      },
    },
  })

  return {
    props: {
      cinemaDetails: {
        ...cinemaDetails,
        movies: cinemaDetails.cinema_movie
          ? cinemaDetails.cinema_movie.movies
          : [],
      },
    },
  }
}

export default function CinemaMoviesPage({ cinemaDetails }) {
  const { back } = useRouter()
  return (
    <AppLayout pageTitle={`${cinemaDetails.name} Movies`}>
      <AnimatedContainer className="flex-1 py-2.5 lg:py-10">
        <div className="sticky top-[59px] flex items-center gap-2 bg-white px-5 py-2.5 dark:bg-slate-950 lg:static lg:mb-2.5 lg:px-10">
          <button className="lg:hidden" onClick={back}>
            <BsArrowLeftShort size={24} />
          </button>
          <h1 className="font-poppins text-sm font-semibold lg:text-3xl">
            {cinemaDetails.name}
          </h1>
        </div>
        <div className="px-5 py-2 lg:px-10">
          <div className="flex w-full flex-col gap-2">
            {!cinemaDetails.movies.length ? (
              <div className="flex h-40 items-center justify-center">
                <p className="font-poppins text-xs lg:text-sm">
                  No Active Movies
                </p>
              </div>
            ) : (
              cinemaDetails.movies.map((movie) => (
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
    </AppLayout>
  )
}
