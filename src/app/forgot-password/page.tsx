"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";

type ForgotPasswordResponse = {
    message: string;
    resetUrl?: string;
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [debugResetUrl, setDebugResetUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setDebugResetUrl(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = (await response.json()) as ForgotPasswordResponse;

            if (!response.ok) {
                setError(data.message || "No se pudo procesar la solicitud.");
                return;
            }

            setMessage(data.message);
            if (data.resetUrl) {
                setDebugResetUrl(data.resetUrl);
            }
        } catch (err) {
            console.error("Error solicitando recuperación:", err);
            setError("Ocurrió un error de red. Inténtalo nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Navbar />
            <div className="w-full md:w-5/12 min-h-screen bg-blue-950 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_transparent)] from-blue-900 opacity-50" />
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Recupera tu acceso</h2>
                    <p className="text-blue-200 text-sm max-w-xs">
                        Te ayudamos a restablecer tu contraseña de forma segura.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="max-w-sm mx-auto w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        ¿Olvidaste tu contraseña?
                    </h1>
                    <p className="text-gray-500 mb-8 text-center text-sm">
                        Ingresa tu correo y te enviaremos un enlace para restablecerla.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                required
                            />
                        </div>

                        {message && (
                            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm text-center">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {debugResetUrl && (
                            <div className="p-3 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs break-all">
                                Enlace de prueba (modo desarrollo):
                                <a className="block mt-1 underline" href={debugResetUrl}>
                                    {debugResetUrl}
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[50px] bg-[#FF7400] hover:bg-[#e06500] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Enviando..." : "Enviar enlace"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            ¿Recordaste tu contraseña?{" "}
                            <Link href="/login" className="text-[#FF7400] font-semibold hover:underline">
                                Volver a iniciar sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
