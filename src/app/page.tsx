import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 p-4">
      <div className="space-y-2 text-center">
        <h1 className="font-poppins text-lg font-semibold lg:text-4xl">
          Cinema Ticket Booking App
        </h1>
        <p className="font-openSans text-xs lg:text-base">
          This is my attempt on making a Cinema Ticket Booking App
        </p>
      </div>
      <Link
        href="/app"
        className="flex w-24 items-center justify-center gap-2 rounded-full border border-slate-900 p-2 font-semibold text-slate-800 transition duration-200 hover:scale-[105%] hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900 lg:w-32"
      >
        <span className="text-sm lg:text-base">App</span>
        <BsArrowRight size="18" />
      </Link>
    </div>
  )
}
