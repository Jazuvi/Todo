"use client";
import { useData } from "@/context/TaskProvider";
import { Task } from "@/models/Task";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type NewProps = {
  params: Params;
};

export default function New({ params }: NewProps) {
  const { createTask, editTask, tasks } = useData();
  const router = useRouter();
  const onSubmit: SubmitHandler<Task> = (data) => {
    if (!params.id) {
      createTask({ ...data, id: uuidv4() });
      toast.success("tarea creada");
    } else {
      editTask(data);
      toast.success("tarea editada");
    }

    router.push("/");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>();

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((localTask) => localTask.id === params.id);
      if (taskFound) {
        setValue("id", taskFound.id);
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <section className="flex flex-col justify-center items-center text-white bg-gray-700 self-center mt-10 p-3">
        <h1 className="text-2xl font-extrabold dark:text-white">Nueva Tarea</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="m-1 p-2 bg-gray-500"
            placeholder="agregar titulo"
            {...register("title", { required: true })}
          ></input>
          {errors.title && (
            <span className="text-red-400 p-1">El titulo es requirido</span>
          )}
          <textarea
            className="m-1 p-2 bg-gray-500"
            placeholder="agregar descripcion"
            {...register("description")}
          ></textarea>
          <button
            className="hover:bg-green-600 m-1 p-2 bg-green-400 text-white "
            type="submit"
          >
            Guardar
          </button>
        </form>
      </section>
    </div>
  );
}
