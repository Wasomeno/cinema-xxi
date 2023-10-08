import { prisma } from "lib/prisma"

import AnimatedContainer from "@/components/AnimatedContainer"
import { AppBannerSlider } from "@/components/App/Home/AppBannerSlider"
import { RegionListModalTrigger } from "@/components/App/Home/RegionListModalTrigger"
import { RegionMovies } from "@/components/App/Home/RegionMovies"
import AppLayout from "@/components/Layouts/AppLayout"

export async function getServerSideProps({ query }) {
  const region = await prisma.region.findUnique({
    where: { id: query.region ? parseInt(query.region) : 1 },
  })
  return {
    props: {
      region,
    },
  }
}

export default function AppHomePage({ region }) {
  return (
    <AppLayout title="Cinema App">
      <AnimatedContainer className="z-5 relative flex flex-1 scroll-p-8 flex-col gap-4 overflow-y-scroll p-4 transition-all duration-200">
        <div className="flex items-center justify-center">
          <AppBannerSlider />
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-5/6">
            <RegionListModalTrigger region={region} />
          </div>
        </div>
        <RegionMovies />
      </AnimatedContainer>
    </AppLayout>
  )
}
