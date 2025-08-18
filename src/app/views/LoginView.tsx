"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const goToHome = () => {
        router.push("/");
    }
    const goToRegistration = () => {
        router.push("/register");
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (response?.ok) {
            console.log("Login successful");
            router.push("/dashboard");
        } else {
            alert("Error al iniciar sesión. Por favor, verifica tus datos.");
        }
    };

    return (
        <>
            <nav className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                <div className="max-w-[1536px] flex flex-wrap items-center mx-auto p-2">
                    {/* Botón "Volver a atrás"*/}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center text-gray-400 focus:z-10 focus:ring-2 focus:ring-orange-600 rounded-xl hover:bg-gray-500 dark:hover:bg-gray-500"
                        ><ChevronLeftIcon className="h-8 w-8 mr-1" aria-hidden="true" />
                        </button>
                    </div>
                    <button onClick={goToHome} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/Logo.png" className="w-10 h-10 rounded-full bg-gray-500" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-white">Project Pulse</span>
                    </button>
                </div>
            </nav>
            <form onSubmit={handleSubmit} className="flex items-center justify-center min-h-screen p-4">
                <div className="flex-shrink-0">
                    <img src="/Logo.png" className="mx-20 my-0 w-100 h-100 rounded-full" alt="Logo" />
                </div>
                <div className="w-full max-w-md backdrop-blur-sm p-6 rounded-lg">
                    <h1 className="text-3xl font-semibold text-center mb-6">Iniciar Sesión</h1>
                    <div className="">
                        <div>
                            <label className="block text-left text-xl font-poppins mb-2">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Escribe tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[45px] w-[400px] p-2 border rounded-md mb-2"
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
                            />
                        </div>
                        <p className="text-center text-sm">
                            ¿No tienes cuenta?{" "}
                            <button
                                onClick={goToRegistration}
                                className="text-secondary-500 hover:underline"
                            >
                                Regístrate
                            </button>
                        </p>
                        <button type="submit"
                            className="h-[54px] w-[247px] text-xl rounded-full mt-4 ml-[85px] text-white md:hover:text-orange-600 transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            Entrar
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