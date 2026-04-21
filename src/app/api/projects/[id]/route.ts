import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

type TaskItem = {
  id: number;
  nombre: string;
  completado: boolean;
};

type ProjectPayload = {
  nombre?: string;
  descripcion?: string;
  estado?: string;
  prioridad?: string;
  progreso?: number;
  tareas?: TaskItem[];
  equipo?: string[];
  fechaInicio?: string;
  fechaFin?: string;
};

const isValidDate = (value?: string) => {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const calculateProgressFromTasks = (tasks?: TaskItem[]) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return null;
  }

  const completedTasks = tasks.filter((task) => task.completado).length;
  return Math.round((completedTasks / tasks.length) * 100);
};

const clampProgress = (value?: number) => {
  const progress = Number(value);
  if (Number.isNaN(progress)) return 0;
  return Math.min(Math.max(progress, 0), 100);
};

const normalizeTextArray = (value?: string[]) =>
  Array.isArray(value) ? value.map((item) => item.trim()).filter(Boolean) : [];

const normalizeTasks = (value?: unknown) =>
  Array.isArray(value)
    ? value
        .map((task) => ({
          id: Number(task.id),
          nombre: String(task.nombre ?? "").trim(),
          completado: Boolean(task.completado),
        }))
        .filter((task) => task.nombre.length > 0)
    : [];

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Proyecto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo proyecto:", error);
    return NextResponse.json(
      { message: "No se pudo cargar el proyecto" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as ProjectPayload;
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: "Proyecto no encontrado" },
        { status: 404 },
      );
    }

    const nombre = body.nombre?.trim() || existingProject.nombre;
    const descripcion = body.descripcion?.trim() || existingProject.descripcion;
    const estado = body.estado?.trim() || existingProject.estado;
    const prioridad = body.prioridad?.trim() || existingProject.prioridad;
    const tareas =
      body.tareas !== undefined
        ? normalizeTasks(body.tareas)
        : normalizeTasks(existingProject.tareas);
    const progressFromTasks = calculateProgressFromTasks(tareas);
    const progreso =
      progressFromTasks ??
      clampProgress(body.progreso ?? existingProject.progreso);
    const equipo =
      body.equipo !== undefined
        ? normalizeTextArray(body.equipo)
        : existingProject.equipo;
    const fechaInicio =
      body.fechaInicio ?? existingProject.fechaInicio.toISOString();
    const fechaFin = body.fechaFin ?? existingProject.fechaFin.toISOString();

    if (!nombre || !descripcion || !fechaInicio || !fechaFin) {
      return NextResponse.json(
        {
          message: "nombre, descripcion, fechaInicio y fechaFin son requeridos",
        },
        { status: 400 },
      );
    }

    if (!isValidDate(fechaInicio) || !isValidDate(fechaFin)) {
      return NextResponse.json(
        { message: "Las fechas enviadas no son válidas" },
        { status: 400 },
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        estado,
        prioridad,
        progreso,
        tareas: tareas as Prisma.InputJsonValue,
        equipo: equipo as Prisma.InputJsonValue,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
      },
    });

    return NextResponse.json(
      { message: "Proyecto actualizado", project },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error actualizando proyecto:", error);
    return NextResponse.json(
      { message: "Ocurrió un error en el servidor" },
      { status: 500 },
    );
  }
}
