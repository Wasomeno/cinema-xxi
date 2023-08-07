import Head from "next/head";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex p-4 h-screen gap-5 flex-col items-center justify-center">
      <Head>
        <title>Cinema App</title>
      </Head>
      <div className="text-center space-y-2">
        <h1 className="font-semibold font-poppins text-lg lg:text-4xl">
          Cinema Ticket Booking App
        </h1>
        <p className="font-openSans lg:text-base text-xs">
          This is my attempt on making a Cinema Ticket Booking App
        </p>
      </div>
      <Link
        href="app"
        className="p-2 w-24 border dark:border-white border-slate-900 lg:w-32 flex justify-center items-center gap-2 rounded-full transition hover:scale-[105%] duration-200 hover:text-white hover:bg-slate-900 dark:hover:text-slate-900 dark:hover:bg-white text-slate-800 dark:text-white font-semibold"
      >
        <span className="lg:text-base text-sm">App</span>
        <BsArrowRight size="18" />
      </Link>
    </div>
  );
}
