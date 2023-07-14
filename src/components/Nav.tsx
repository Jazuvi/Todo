"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-600 p-6">
      <Link href={"/"}>
        <h1 className="font-semibold text-xl tracking-tight text-teal-200 hover:text-white mr-4">
          To do List
        </h1>
      </Link>
      <Link
        href={"/new"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        <h3>Agregar Tarea</h3>
      </Link>
    </nav>
  );
}
