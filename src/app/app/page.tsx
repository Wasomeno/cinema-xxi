import { Metadata } from "next"
import invariant from "tiny-invariant"

import { prisma } from "@/lib/prisma"
import { AnimatedContainer } from "@/components/animated-container"
import { BannerSlider } from "@/components/App/Home/banner-slider"
import { RegionListModalTrigger } from "@/components/App/Home/region-list-modal-trigger"
import { RegionMovies } from "@/components/App/Home/region-movies"

type AppHomePageProps = {
  searchParams: { region: string }
}

export const metadata: Metadata = {
  title: "Cinema XXI",
}

export default async function AppHomePage({ searchParams }: AppHomePageProps) {
  const region = await prisma.region.findUnique({
    where: { id: searchParams.region ? parseInt(searchParams.region) : 1 },
  })

  const moviesInRegion = await prisma.movie.findMany({
    where: { cinema_movies: { some: { cinema: { regionId: region?.id } } } },
  })

  invariant(region)

  return (
    <AnimatedContainer className="z-5 relative flex flex-1 scroll-p-8 flex-col gap-4 overflow-y-scroll p-4 transition-all duration-200">
      <div className="flex items-center justify-center">
        <BannerSlider />
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <RegionListModalTrigger region={region} />
        </div>
      </div>
      <RegionMovies movies={moviesInRegion} />
    </AnimatedContainer>
  )
}
