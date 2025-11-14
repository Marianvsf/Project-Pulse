"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useState } from "react";
import Image from "next/image";

export default function RegisterView() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const goToHome = () => {
        router.push("/");
    }

    const goToLogin = () => {
        router.push("/login");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
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
                console.log("Registration successful");

                router.push("/login");

                const data = await response.json();
                setError(data.message || "Error al registrar. Por favor, inténtalo de nuevo.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("Ocurrió un error de red. Por favor, inténtalo más tarde.");
        }
    };

    return (
        <>
            <nav className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="max-w-[1536px] flex flex-wrap items-center mx-auto p-2">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center text-gray-400 focus:z-10 focus:ring-2 focus:ring-orange-600 rounded-xl hover:bg-gray-500 dark:hover:bg-gray-500"
                        ><ChevronLeftIcon className="h-8 w-8 mr-1" aria-hidden="true" />
                        </button>
                    </div>
                    <button onClick={goToHome} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image width={10} height={10} src="/Logo.png" className="w-10 h-10 rounded-full bg-gray-500" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-white">Project Pulse</span>
                    </button>
                </div>
            </nav>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:space-x-12">
                <div className="flex-shrink-0">
                    <Image width={100} height={100} src="/Logo.png" className="mx-20 my-0 w-100 h-100 rounded-full" alt="Logo" />
                </div>
                <div className="w-full max-w-md backdrop-blur-sm p-6 rounded-lg">
                    <h1 className="text-3xl font-semibold text-center mb-6">Crear Cuenta</h1>
                    <div className="">
                        <div>
                            <label className="block text-left text-xl font-poppins mb-2">Nombre</label>
                            <input
                                type="text"
                                placeholder="Escribe tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-[45px] w-[400px] p-2 border rounded-md mb-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-xl font-poppins mb-2">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Escribe tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[45px] w-[400px] p-2 border rounded-md mb-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-xl font-poppins mb-2">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Escribe tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-[45px] w-[400px] p-2 border rounded-md mb-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-xl font-poppins mb-2">Confirmar Contraseña</label>
                            <input
                                type="password"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-[45px] w-[400px] p-2 border rounded-md mb-2"
                                required
                            />
                        </div>
                        <p className="text-center text-sm">
                            ¿Ya tienes cuenta?{" "}
                            <button
                                type="button"
                                onClick={goToLogin}
                                className="text-secondary-500 hover:underline"
                            >
                                Inicia sesión
                            </button>
                        </p>
                        <button type="submit"
                            className="h-[54px] w-[247px] text-xl rounded-full mt-4 ml-[85px] text-white md:hover:text-orange-600 transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            Registrarse
                        </button>
                        {error && (
                            <p className="text-red-500 mt-4 text-center">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </form >
        </>
    );
}