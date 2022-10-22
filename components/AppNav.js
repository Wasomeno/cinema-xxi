import Link from "next/link";
import React from "react";

const AppNav = () => {
  return (
    <header className="flex flex-col justify-start items-center p-2 m-4 w-60 h-full border-r-2 border-black">
      <h1 className="font-poppins font-semibold text-xl p-2">Cinema 21</h1>
      <div className="self-start w-full">
        <div className="my-4">
          <h2 className="font-poppins font-medium text-lg">Menu</h2>
        </div>
        <div className="flex items-center my-4 p-2 rounded-lg transition ease-in-out hover:bg-zinc-300 duration-300 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>

          <Link href={"/app"}>
            <a className="font-poppins w-full text-center">App</a>
          </Link>
        </div>
        <div className="flex items-center my-4 p-2 rounded-lg transition ease-in-out hover:bg-zinc-300 duration-300 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clip-rule="evenodd"
            />
          </svg>

          <Link href={"/app/profile"}>
            <a className="font-poppins w-full text-center">Profile</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppNav;
