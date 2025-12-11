"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar"; // Ajusta la ruta si es necesario

export default function RegisterView() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const goToLogin = () => {
        router.push("/login");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                router.push("/login");
            } else {
                const data = await response.json();
                setError(data.message || "Error al registrar. Por favor, inténtalo de nuevo.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("Ocurrió un error de red. Por favor, inténtalo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* FONDO: bg-gray-100 como solicitaste */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24">

                {/* TARJETA PRINCIPAL: Sombra suave y bordes redondeados estilo Navbar */}
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* SECCIÓN IZQUIERDA (Branding): Mantiene el Azul del Navbar */}
                    <div className="w-full md:w-5/12 bg-blue-950 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
                        {/* Círculo decorativo de fondo */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 to-transparent opacity-50" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
                                <Image
                                    className="object-contain"
                                    src="/IconLogo.png"
                                    alt="Logo"
                                    fill
                                    priority
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Bienvenido a Project Pulse</h2>
                            <p className="text-blue-200 text-sm max-w-xs">
                                Gestiona tus proyectos de forma eficiente y colaborativa.
                            </p>
                        </div>
                    </div>

                    {/* SECCIÓN DERECHA (Formulario): Fondo Blanco Limpio */}
                    <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <div className="max-w-md mx-auto w-full">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
                            <p className="text-gray-500 mb-8 text-sm">Completa el formulario para comenzar.</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Nombre y Apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Ej. Juan Pérez"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Correo electrónico</label>
                                    <input
                                        type="email"
                                        placeholder="tucorreo@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Contraseña</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirmar</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full h-[50px] px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-[50px] mt-4 bg-[#FF7400] hover:bg-[#e06500] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Registrarse"
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    ¿Ya tienes cuenta?{" "}
                                    <button
                                        type="button"
                                        onClick={goToLogin}
                                        className="text-[#FF7400] font-semibold hover:underline"
                                    >
                                        Inicia sesión
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}