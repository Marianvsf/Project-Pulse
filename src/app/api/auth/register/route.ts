import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const { email, password, name } = body;
  
        if (!email || !password) {
        return NextResponse.json(
            { message: "Email y contraseña son requeridos" },
            { status: 400 }
        );
        }

        const existingUser = await prisma.user.findUnique({
        where: { email: email },
        });

        if (existingUser) {
        return NextResponse.json(
            { message: "Este email ya está registrado" },
            { status: 409 } 
        );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
        data: {
            email: email,
            hashedPassword: hashedPassword,
            name: name,
        },
        });

        return NextResponse.json(
        { message: "Usuario creado", userId: newUser.id, email: newUser.email },
        { status: 201 } 
        );

    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json(
        { message: "Ocurrió un error en el servidor" },
        { status: 500 }
        );
    }
    }