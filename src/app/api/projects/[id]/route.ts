import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
