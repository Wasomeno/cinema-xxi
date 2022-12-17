import Link from "next/link";
import React from "react";

const RegularNav = () => {
  return (
    <header className="flex justify-around items-center m-4 fixed w-screen">
      <Link href={"/"}>Home</Link>
      <Link href={"about"}>About</Link>
      <Link href={"app"}>App</Link>
    </header>
  );
};

export default RegularNav;
