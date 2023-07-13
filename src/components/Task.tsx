"use client";
import { useRouter } from "next/navigation";
import { Task } from "@/models/Task";
import { useData } from "@/context/TaskProvider";

import { FaTrash, FaEdit } from "react-icons/fa";

type TaskProps = {
  task: Task;
};

export default function Task({ task }: TaskProps) {
  const router = useRouter();
  const { deleteTask } = useData();
  return (
    <div className=" w-3/4 mx-auto m-3 bg-white rounded-xl shadow-md overflow-hidden p-4 md:min-w-30">
      <div className="flex flex-row m-1">
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline w-3/4">
          {task.title}
        </h2>
        <div className="flex justify-around gap-1 text-white w-1/4">
          <button
            className="hover:bg-green-400 bg-green-600 p-1 rounded w-6 h-6"
            onClick={() => {
              router.push(`/edit/${task.id}`);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="hover:bg-red-400 bg-red-600 p-1 rounded w-6 h-6"
            onClick={() => {
              deleteTask(task);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <hr />
      <p className="mt-2 text-slate-500">{task.description}</p>
    </div>
  );
}
