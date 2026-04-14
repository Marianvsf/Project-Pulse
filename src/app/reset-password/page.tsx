"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/navbar/Navbar";

type ResetPasswordResponse = {
    message: string;
};

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!token) {
            setError("El enlace no contiene un token válido.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = (await response.json()) as ResetPasswordResponse;

            if (!response.ok) {
                setError(data.message || "No se pudo restablecer la contraseña.");
                return;
            }

            setMessage(data.message);
            setTimeout(() => {
                router.push("/login");
            }, 1200);
        } catch (err) {
            console.error("Error restableciendo contraseña:", err);
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
                    <h2 className="text-2xl font-bold text-white mb-2">Nueva contraseña</h2>
                    <p className="text-blue-200 text-sm max-w-xs">
                        Crea una contraseña segura para volver a entrar a tu cuenta.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="max-w-sm mx-auto w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        Restablecer contraseña
                    </h1>
                    <p className="text-gray-500 mb-8 text-center text-sm">
                        Ingresa tu nueva contraseña para completar el proceso.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                Nueva contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                placeholder="Mínimo 8 caracteres"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                placeholder="Repite tu contraseña"
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[50px] bg-[#FF7400] hover:bg-[#e06500] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Actualizando..." : "Actualizar contraseña"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
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
