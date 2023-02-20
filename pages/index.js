import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-3/4 flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <h1 className="font-poppins m-4 text-5xl font-medium -tracking-tight">
          Cinema 21
        </h1>
      </div>
      <div>
        <p className="text-center text-xl">
          Web 3 version of your regular movie tickets app.
        </p>
        <div className="flex items-center justify-center">
          <p className="text-center text-lg">
            It &lsquo s not Better, but it &lsquo s different
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="mx-3 h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>
      <Link
        href={"app"}
        className="m-5 w-40 rounded-full border-2 border-solid border-black bg-slate-900 p-2 text-center text-lg text-white transition duration-300 ease-in-out hover:scale-x-105 hover:bg-white hover:text-black"
      >
        Go To App
      </Link>
    </div>
  );
}
