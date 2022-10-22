import Link from "next/link";
import React from "react";

const RegularNav = () => {
  return (
    <header className="flex justify-around items-center m-4 fixed w-screen">
      <Link href={"/"}>
        <a>Home</a>
      </Link>
      <Link href={"about"}>
        <a>About</a>
      </Link>
      <Link href={"app"}>
        <a>App</a>
      </Link>
    </header>
  );
};

export default RegularNav;
