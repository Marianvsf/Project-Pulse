"use client";


import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";


export default function HomePage() {
    const router = useRouter();
    const goToRegistration = () => {
        router.push("/register");
    }

    return (
        <>
            <Navbar />
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-1 pb-10 sm:p-20">
                <main className="flex flex-col md:flex-row items-center justify-center row-start-2 w-full">
                    <div className="flex flex-col items-start m-5 mr-1">
                        <h1 className="m-5 font-poppins text-[74px] leading-[117%] font-normal">¡Bienvenido a Project Pulse!</h1>
                        <h6 className="rounded-xl font-poppins text-[20px] leading-[175%] max-w-md p-5 mt-4 tracking-wide">
                            Sigue el pulso de tu proyecto, siente el progreso.</h6>
                        <button onClick={goToRegistration}
                            className="h-[54px] w-[247px] text-xl rounded-full mt-4 ml-[85px] text-white md:hover:text-orange-600 transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            Crear cuenta</button>
                        {/* <button onClick={goToLogin}
                            className="h-[54px] w-[247px] text-xl rounded-full mt-4 ml-[85px] text-white hover:bg-[#262162] transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            Iniciar Sesión</button> */}
                    </div>
                    <div className="mt-2 md:mt-0">
                        <Image
                            className="w-[488px] h-[375px] mb-5"
                            src="/IconLogo.png"
                            alt="symbol"
                            width={488}
                            height={375}
                        />
                    </div>
                </main >
            </div >
        </>
    );
}