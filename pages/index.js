import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="m-4 p-2">
        <h1 className="font-inter text-lg">Cinema Ticket Booking App</h1>
      </div>
      <div className="w-5/6 text-center">
        <p className="font-poppins text-sm">
          This is my attempt on making a Cinema Ticket Booking App
        </p>
      </div>
      <Link
        href="app"
        className="m-5 w-40 rounded-full border-2 border-solid border-black bg-slate-900 p-2 text-center text-white transition duration-300 ease-in-out hover:scale-x-105 hover:bg-white hover:text-black"
      >
        Go To App
      </Link>
    </div>
  );
}
