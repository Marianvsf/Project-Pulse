"use client";


import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "./header";

export default function HomePage() {
    const router = useRouter();
    const goToLogin = () => {
        router.push("/login");
    }
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images = [
        "/assets/fot1.jpg",
        "/assets/fot2.jpg",
        "/assets/fot3.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handlePrev = (): void => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (): void => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    const goToRegistration = () => {
        router.push("/register");
    }

    return (
        <>
            <Navbar />
            {/*<header>
                <div id="default-carousel" className="relative w-full" data-carousel="slide">
                    {/* <!-- Carousel wrapper --> 
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                                style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
                            >
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={image}
                                    className="absolute block w-full h-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                                aria-current={index === currentSlide}
                                aria-label={`Slide ${index + 1}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                    {/* <!-- Slider indicators --> 
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    {/* <!-- Slider controls --> *
                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handlePrev}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handleNext}>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </header>
            */}

            <main className="flex flex-col items-center text-center justify-center m-auto max-w-[980px]">
                <h1 className="m-auto mt-15 text-[50px] font-extrabold text-center tracking-tighter">La gestión de tus proyectos, simplificada y centralizada.</h1>
                <div className="max-w-[750px]">
                    <small className="text-center text-[25px] text-gray-500 dark:text-gray-400 font-extrabold">
                        Project-Pulse ayuda a los equipos a organizar tareas, seguir el progreso y colaborar eficazmente, todo en un solo lugar.
                    </small>
                </div>
                <div className="flex items-center text-center justify-center m-auto mb-10 space-x-3">
                    <button onClick={goToRegistration}
                        className="h-[44px] w-[237px] text-lg rounded-xl mt-7 text-white md:hover:text-orange-600 transition-colors duration-200 justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                        Registrarse Gratis</button>
                    <button onClick={goToLogin}
                        className="h-[44px] w-[237px] text-lg rounded-xl mt-7 text-white md:hover:text-blue-400 transition-colors duration-200 justify-center items-center bg-white border border-blue-600 dark:bg-blue-600">
                        Ver Demo</button>
                </div>
                <Header />
                <Image
                    className="w-[180px] h-[175px] mb-5"
                    src="/IconLogo.png"
                    alt="symbol"
                    width={188}
                    height={75}
                />
            </main >
        </>
    );
}