import { useSkeleton } from "@/hooks/useSkeleton"
import { AppLayout } from "@/components/app-layout"
import { CinemaCardSkeleton, Cinemas } from "@/components/App/Movie/cinemas"
import { Dates } from "@/components/App/Movie/date"
import { Movie } from "@/components/App/Movie/movie"

export default function MovieLoadingPage() {
  const cinemaSkeletons = useSkeleton(<CinemaCardSkeleton />, 5)
  return (
    <AppLayout className="flex w-full flex-1 flex-col items-center gap-6 p-4">
      <Movie.Skeleton />
      <Dates />
      <Cinemas>{cinemaSkeletons}</Cinemas>
    </AppLayout>
  )
}
