import { Metadata } from "next"
import { Region } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { AnimatedContainer } from "@/components/animated-container"
import { AppBannerSlider } from "@/components/App/Home/app-banner-slider"
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
  const regionMovies = await prisma.movie.findMany({
    where: { cinema_movies: { some: { cinema: { regionId: region?.id } } } },
  })

  return (
    <AnimatedContainer className="z-5 relative flex flex-1 scroll-p-8 flex-col gap-4 overflow-y-scroll p-4 transition-all duration-200">
      <div className="flex items-center justify-center">
        <AppBannerSlider />
      </div>
      <div className="flex justify-center">
        <div className="w-full lg:w-5/6">
          <RegionListModalTrigger region={region as Region} />
        </div>
      </div>
      <RegionMovies movies={regionMovies} />
    </AnimatedContainer>
  )
}
