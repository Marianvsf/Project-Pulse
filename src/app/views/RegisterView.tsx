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
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:space-x-12">
            <div className="flex-shrink-0">
                <Image className="m-auto w-[180px] h-[175px] mb-5" src="/IconLogo.png" alt="symbol" width={188} height={75} />
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
    );
}