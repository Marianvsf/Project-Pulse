"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const goToLogin = () => router.push("/login");
  const goToRegistration = () => router.push("/register");

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const images = ["/assets/fot1.jpg", "/assets/fot2.jpg", "/assets/fot3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative min-h-screen bg-white">
      {/* 1. NAVBAR (Con z-index alto para estar siempre visible) */}
      <div className="relative z-50">
        <Navbar />
      </div>
      <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill // Ocupa todo el contenedor padre
                className="object-cover object-center"
                priority={index === 0} // Carga rápida para la primera
              />
              {/* OVERLAY: Capa negra semitransparente para que el texto blanco se lea perfecto */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL (Texto y Botones) - Ahora vive DENTRO del Header */}
        <div className="relative z-10 w-full max-w-[980px] px-6 text-center text-white mt-16">
          {/* Badge / Etiqueta opcional */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Gestión de proyectos v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 leading-[1.1]">
            La gestión de tus proyectos, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
              simplificada y centralizada.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/80 font-medium mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Project-Pulse ayuda a los equipos a organizar tareas, seguir el
            progreso y colaborar eficazmente, todo en un solo lugar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            {/* Botón Principal */}
            <button
              onClick={goToRegistration}
              className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 
                                bg-[#FF7400] shadow-[0_0_20px_rgba(255,116,0,0.4)] hover:shadow-[0_0_30px_rgba(255,116,0,0.6)] hover:scale-105"
            >
              Registrarse Gratis
            </button>

            {/* Botón Secundario (Glass Effect sobre imagen) */}
            <button
              onClick={goToLogin}
              className="h-[52px] w-full sm:w-[240px] text-lg font-medium rounded-xl text-white transition-all duration-300
                                bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-105"
            >
              Ver Demo
            </button>
          </div>

          {/* Controles del Slider (Opcionales, pequeños abajo) */}
          <div className="absolute bottom-18 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Flechas laterales (Sutiles) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </header>
      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Todo lo que necesitas para liderar
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Deja de usar hojas de cálculo y correos dispersos. Project Pulse
              unifica tu flujo de trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Organización Visual
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Tableros Kanban, listas y cronogramas. Visualiza el estado de
                cada tarea al instante y sin esfuerzo.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Automatización Real
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Olvídate de las tareas repetitivas. Configura recordatorios y
                flujos de trabajo automáticos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Colaboración en vivo
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Comentarios, menciones y adjuntos en tiempo real. Mantén a tu
                equipo sincronizado siempre.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* {/* SECCIÓN BENTO GRID *
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Bloque Grande (Izquierda) *
                        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Panel de Control Intuitivo</h3>
                                <p className="text-slate-500">Todo lo importante, en una sola vista.</p>
                            </div>
                            {/* Mockup visual abstracto *
                            <div className="mt-8 bg-slate-100 rounded-tl-xl border border-slate-200 h-64 w-full shadow-inner group-hover:scale-105 transition-transform duration-500 origin-bottom-right"></div>
                        </div>

                        {/* Bloque Pequeño (Derecha Arriba) 
                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-center items-center text-center">
                            <h3 className="text-5xl font-extrabold mb-2">10x</h3>
                            <p className="text-blue-100 font-medium">Más productividad en equipos remotos.</p>
                        </div>

                        {/* Bloque Pequeño (Derecha Abajo) 
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Tareas al día</h4>
                                    <p className="text-xs text-slate-500">Sin retrasos</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">⚡</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Reportes</h4>
                                    <p className="text-xs text-slate-500">Automáticos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}
      {/* SECCIÓN DE PRECIOS */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Planes flexibles para cada etapa
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Plan Gratuito */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full md:w-80 hover:border-blue-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <p className="text-slate-500 text-sm mt-2">
                Para estudiantes y hobby
              </p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  $0
                </span>
                <span className="text-slate-500">/mes</span>
              </div>
              <ul className="text-left space-y-3 mb-8 text-slate-600 text-sm">
                <li className="flex items-center gap-2">✓ Hasta 3 proyectos</li>
                <li className="flex items-center gap-2">✓ 1 usuario</li>
                <li className="flex items-center gap-2">
                  ✓ Historial de 7 días
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Empezar Gratis
              </button>
            </div>

            {/* Plan Pro (Destacado) */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-900 shadow-xl w-full md:w-80 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-bold text-white">Pro Team</h3>
              <p className="text-slate-400 text-sm mt-2">Para equipos ágiles</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$15</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="text-left space-y-3 mb-8 text-slate-300 text-sm">
                <li className="flex items-center gap-2 text-white">
                  ✓ Proyectos ilimitados
                </li>
                <li className="flex items-center gap-2 text-white">
                  ✓ Hasta 10 usuarios
                </li>
                <li className="flex items-center gap-2 text-white">
                  ✓ Analíticas avanzadas
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">
                Prueba 14 días
              </button>
            </div>
          </div>
        </div>
      </section>
      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Project Pulse?
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
          <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
            <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">❌</span> Sin Project Pulse
            </h3>
            <ul className="space-y-4 text-red-700/80 text-left">
              <li className="flex gap-3">
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Información dispersa en emails y chats.
              </li>
              <li className="flex gap-3">
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Fechas de entrega olvidadas constantemente.
              </li>
              <li className="flex gap-3">
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Nadie sabe quién está haciendo qué.
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 blur-2xl rounded-full -mr-10 -mt-10"></div>
            <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 relative z-10">
              <span className="text-2xl">✅</span> Con Project Pulse
            </h3>
            <ul className="space-y-4 text-blue-800/80 relative z-10 text-left">
              <li className="flex gap-3 font-medium">
                <svg
                  className="w-6 h-6 text-blue-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Todo centralizado en un solo dashboard.
              </li>
              <li className="flex gap-3 font-medium">
                <svg
                  className="w-6 h-6 text-blue-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Alertas automáticas antes de vencer plazos.
              </li>
              <li className="flex gap-3 font-medium">
                <svg
                  className="w-6 h-6 text-blue-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Claridad total en roles y responsabilidades.
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-100 py-12">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
                30%
              </p>
              <p className="text-slate-600 font-medium">Más productividad</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
                10k+
              </p>
              <p className="text-slate-600 font-medium">Tareas completadas</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
                2h
              </p>
              <p className="text-slate-600 font-medium">Ahorradas al día</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
                4.9/5
              </p>
              <p className="text-slate-600 font-medium">Valoración usuarios</p>
            </div>
          </div>
        </div>
        <div className="mt-24 mb-10 w-full max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 z-0"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para organizar tu trabajo?
              </h2>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Únete a los estudiantes y profesionales que ya están gestionando
                sus proyectos de forma inteligente.
              </p>
              <button
                onClick={goToRegistration}
                className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 
                                bg-[#FF7400] shadow-[0_0_20px_rgba(255,116,0,0.4)] hover:shadow-[0_0_30px_rgba(255,116,0,0.6)] hover:scale-105"
              >
                Comenzar Gratis Ahora
              </button>
              <p className="mt-4 text-sm text-slate-500">
                No se requiere tarjeta de crédito
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
