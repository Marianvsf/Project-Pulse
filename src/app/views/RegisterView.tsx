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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        <div className="flex flex-col md:flex-row">
            <Navbar />
            <div className="w-full min-h-screen md:w-5/12 bg-blue-950 flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Círculo decorativo de fondo */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_transparent)] from-blue-900 opacity-50" />

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
            <div className="w-full md:w-7/12 min-h-screen flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Crear Cuenta</h1>
                    <p className="text-gray-500 mb-8 text-sm text-center">Completa el formulario para comenzar.</p>

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
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[50px] px-4 pr-20 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 px-4 flex items-center text-[#FF7400] hover:text-[#e06500] transition-colors"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirmar</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full h-[50px] px-4 pr-20 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7400] focus:ring-1 focus:ring-[#FF7400] transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 px-4 flex items-center text-[#FF7400] hover:text-[#e06500] transition-colors"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
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
    );
}