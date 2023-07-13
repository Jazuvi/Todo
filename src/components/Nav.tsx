"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-600 p-6">
      <Link href={"/"}>
        <h1 className="font-semibold text-xl tracking-tight text-teal-200 hover:text-white mr-4">
          To do List
        </h1>
      </Link>
      <button
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        onClick={() => router.push("/new")}
      >
        Agregar Tarea
      </button>
    </nav>
  );
}
