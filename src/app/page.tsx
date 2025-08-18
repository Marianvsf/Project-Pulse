"use client";

import Image from "next/image";
import HomePage from "./home/page";

export default function Home() {
  return (
    <>
      <div>
        <HomePage />
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mb-4">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/Marianvsf"
            target="_blank"
            rel="noopener noreferrer"
          >Made by →  Marian Suárez
          </a>
        </footer>
      </div>
    </>
  );
}
