"use client";
import Task from "@/components/Task";

import { useData } from "@/context/TaskProvider";
export default function Page() {
  const { tasks } = useData();
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-flow-row ">
      {tasks.map((task) => (
        <Task key={`task-id-${task.id}`} task={task}></Task>
      ))}
    </div>
  );
}
