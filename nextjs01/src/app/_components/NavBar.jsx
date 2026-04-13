"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [logo, setLogo] = useState("LOGO");
  return (
    <header className="flex justify-between py-3 items-center max-w-300 mx-auto">
      <span
        className="text-3xl font-semibold"
        onClick={() => {
          setLogo("F8");
        }}
      >
        {logo}
      </span>
      <ul className="flex gap-3 items-center">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          <Link href={"/contact"}>Contact</Link>
        </li>
      </ul>
    </header>
  );
}
