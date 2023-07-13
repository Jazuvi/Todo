"use client";
import { Task } from "@/models/Task";
import React, { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface DataProvder {
  tasks: Task[];
  createTask(task: Task): void;
  deleteTask(task: Task): void;
  editTask(task: Task): void;
}

type TaskProviderProps = {
  children: ReactNode;
};

const TaskContext = createContext<DataProvder | null>(null);

export function useData(): DataProvder {
  const context = useContext(TaskContext);
  if (!context) throw Error("Error al retornar el context");
  return context;
}

// [
//   { id: "1", title: "my first task", description: "tasks full empty" },
//   { id: "2", title: "my second task", description: "tasks full empty" },
//   { id: "3", title: "my third task", description: "tasks full empty" },
//   { id: "4", title: "my fourth task", description: "tasks full empty" },
// ]
const TASKS_KEY = "tasks";

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  const createTask = (task: Task): void => {
    setTasks([...tasks, task]);
  };

  const editTask = (task: Task): void => {
    setTasks(
      tasks.map((localTask) => (localTask.id === task.id ? task : localTask))
    );
  };

  const deleteTask = (task: Task) => {
    // const index = data.tasks.indexOf(task);
    // if (index !== -1) setData({ ...data, tasks: data.tasks.splice(index, 1) });
    const accepted = window.confirm("Seguro que desea eliminar la tarea?");
    if (accepted) {
      setTasks(tasks.filter((localTask) => localTask.id !== task.id));
      toast.success("tarea eliminada");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
