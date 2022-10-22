import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-3/4">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-poppins m-4 font-medium -tracking-tight">
          Cinema 21
        </h1>
      </div>
      <div>
        <p className="text-xl text-center">
          Web 3 version of your regular movie tickets app.
        </p>
        <div className="flex items-center justify-center">
          <p className="text-lg text-center">
            It's not Better, but it's different
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="w-6 h-6 mx-3"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>
      <Link href={"app"}>
        <a className="p-3 m-5 text-xl text-center border-2 border-solid border-black rounded-full w-40 bg-slate-900 text-white transition ease-in-out hover:bg-white hover:text-black hover:scale-x-105 duration-300">
          Go To App
        </a>
      </Link>
    </div>
  );
}
