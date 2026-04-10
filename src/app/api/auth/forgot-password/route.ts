import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import prisma from "@/lib/prisma";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { message: "El correo electrónico es requerido." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const isDevelopment = process.env.NODE_ENV !== "production";

    if (!user) {
      return NextResponse.json({
        message:
          "Si el correo existe, te enviaremos instrucciones para restablecer tu contraseña.",
      });
    }

    const rawToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpiresAt: expiresAt,
      },
    });

    const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;

    console.info("[password-reset] URL:", resetUrl);

    return NextResponse.json({
      message:
        "Si el correo existe, te enviaremos instrucciones para restablecer tu contraseña.",
      ...(isDevelopment ? { resetUrl } : {}),
    });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return NextResponse.json(
      { message: "No se pudo procesar la solicitud." },
      { status: 500 },
    );
  }
}
