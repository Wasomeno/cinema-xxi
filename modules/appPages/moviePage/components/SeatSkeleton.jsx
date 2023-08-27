import { useSkeleton } from "hooks/useSkeleton"

export default function SeatSkeleton() {
  const seatSkeletons = useSkeleton(
    <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-300 shadow-sm transition duration-200 dark:bg-slate-700 lg:col-span-1" />,
    15
  )
  return (
    <div className="grid grid-cols-5 gap-2 lg:w-auto">
      {seatSkeletons.map((seatSkeleton) => seatSkeleton)}
    </div>
  )
}
