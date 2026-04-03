import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    return NextResponse.json(
      { message: "No se pudieron cargar los proyectos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectPayload;
    const {
      nombre,
      descripcion,
      estado = "Pendiente",
      prioridad = "Media",
      progreso = 0,
      tareas = [],
      equipo = [],
      fechaInicio,
      fechaFin,
    } = body;

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

    const project = await prisma.project.create({
      data: {
        nombre,
        descripcion,
        estado,
        prioridad,
        progreso: Math.min(Math.max(Number(progreso) || 0, 0), 100),
        tareas,
        equipo,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
      },
    });

    return NextResponse.json(
      { message: "Proyecto creado", project },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creando proyecto:", error);
    return NextResponse.json(
      { message: "Ocurrió un error en el servidor" },
      { status: 500 },
    );
  }
}
