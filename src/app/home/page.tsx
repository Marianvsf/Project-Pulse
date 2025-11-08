"use client";


import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function HomePage() {
    const router = useRouter();
    const goToLogin = () => {
        router.push("/login");
    }
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const images: string[] = [
        "https://images.pexels.com/photos/670261/pexels-photo-670261.jpeg",
        "https://images.pexels.com/photos/534757/pexels-photo-534757.jpeg",
        "https://images.pexels.com/photos/930595/pexels-photo-930595.jpeg",
        "https://images.pexels.com/photos/1060803/pexels-photo-1060803.jpeg",
        "https://images.pexels.com/photos/2438323/pexels-photo-2438323.jpeg",
        "https://www.rionegro.com.ar/wp-content/uploads/2023/08/mar-del-plata-playas-mar-del-plata-3-1.jpg"
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

    return (
        <>
            <Navbar />
            <header>
                <div id="default-carousel" className="relative w-full" data-carousel="slide">
                    {/* <!-- Carousel wrapper --> */}
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                                style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
                            >
                                <img
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
                    {/* <!-- Slider indicators --> */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    {/* <!-- Slider controls --> */}
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
                <h1 className="m-auto p-10 text-3xl font-extrabold text-white">¡Conoce los Viajes!<small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                    Te damos la bienvenida a una mejor forma de planificar tu viaje, todo comienza justo aquí.</small>
                </h1>
            </header>
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-1 pb-10 sm:p-20">
                <main className="flex flex-col md:flex-row items-center justify-center row-start-2 w-full">
                    <div className="flex flex-col items-start m-5 mr-1">
                        <h1 className="m-5 font-poppins text-[74px] leading-[117%] font-normal">¡Bienvenido a Project Pulse!</h1>
                        <h6 className="rounded-xl font-poppins text-[20px] leading-[175%] max-w-md p-5 mt-4 tracking-wide">
                            Sigue el pulso de tu proyecto, siente el progreso.</h6>
                        <button onClick={goToLogin}
                            className="h-[54px] w-[247px] text-xl rounded-full mt-4 ml-[85px] text-white md:hover:text-orange-600 transition-colors duration-200 flex justify-center items-center shadow-md bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                            Iniciar Sesión</button>
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