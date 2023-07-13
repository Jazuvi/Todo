"use client";
import { useData } from "@/context/TaskProvider";

export default function About() {
  const { tasks } = useData();
  console.log(tasks);
  return <div>About page</div>;
}
