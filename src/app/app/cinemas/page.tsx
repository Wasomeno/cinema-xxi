import { AnimatedContainer } from "@/components/animated-container"
import { CinemaList } from "@/components/App/Cinemas/cinema-list"
import { CinemaSearchInput } from "@/components/App/Cinemas/cinema-search-input"

export default function AppCinemaSearchPage() {
  return (
    <AnimatedContainer className="flex-1 p-4 lg:p-10">
      <div className="space-y-1.5text-start mb-2.5">
        <h1 className="font-poppins text-base font-semibold lg:text-3xl">
          Search Cinemas
        </h1>
        <p className="text-xs lg:text-base">
          Search for cinema of your choosing
        </p>
      </div>
      <div className="sticky top-[59px] bg-white dark:bg-slate-950 lg:static lg:w-3/6">
        <CinemaSearchInput />
      </div>
      <CinemaList />
    </AnimatedContainer>
  )
}
