"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Swal from "sweetalert2";

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
            Swal.fire({
                icon: "error",
                title: "Algo salió mal",
                text: "¡Verifica tus credenciales!",
                //footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:space-x-12">
            <div className="flex-shrink-0">
            </div>
            <div className="w-full m-auto max-w-md backdrop-blur-sm p-6 rounded-lg">
                <Image className="m-auto w-[180px] h-[175px] mb-5" src="/IconLogo.png" alt="symbol" width={188} height={75} />
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
                            type="button"
                            onClick={goToRegistration}
                            className="text-secondary-500 hover:underline"
                        >
                            Regístrate
                        </button>
                    </p>
                    <button type="submit"
                        className="h-[44px] w-[237px] text-xl rounded-xl mt-4 ml-[85px] text-white md:hover:text-orange-600 transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
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
    );
}