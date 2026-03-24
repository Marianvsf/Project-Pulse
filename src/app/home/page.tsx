"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const images = ["/assets/fot1.jpg", "/assets/fot2.jpg", "/assets/fot3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen bg-white font-sans antialiased text-slate-900">
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image src={image} alt="Hero Background" fill className="object-cover" priority={index === 0} />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">Gestión de proyectos v1.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Tus proyectos, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
              en un solo latido.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Project-Pulse unifica tareas, equipos y cronogramas. La herramienta definitiva para dejar de "sobrevivir" al trabajo y empezar a liderarlo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => router.push("/register")} className="h-14 w-full sm:w-60 bg-[#FF7400] hover:bg-[#e66900] text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-orange-500/20">
              Empezar Gratis
            </button>
            <button onClick={() => router.push("/login")} className="h-14 w-full sm:w-60 bg-white/10 border border-white/20 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white/20 transition-all">
              Ver Demo
            </button>
          </div>
        </div>
      </header>

      {/* --- BENTO GRID: FUNCIONALIDADES CLAVE --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Potencia tu flujo de trabajo</h2>
            <p className="text-slate-600">Diseñado para la velocidad, construido para la colaboración.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div>
                <h3 className="text-2xl font-bold mb-2">Panel de Control Intuitivo</h3>
                <p className="text-slate-500 max-w-sm">Visualiza el progreso de tu equipo con métricas en tiempo real y dashboards personalizados.</p>
              </div>
              <div className="mt-12 bg-slate-100 rounded-xl border border-slate-200 h-48 w-full group-hover:translate-y-2 transition-transform duration-500 shadow-inner" />
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-10 text-white shadow-xl flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-black mb-4 tracking-tighter">10x</span>
              <p className="text-blue-100 font-medium">Aceleración en la entrega de tareas repetitivas mediante IA.</p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Automatización</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Configura flujos de trabajo que se ejecutan solos mientras te enfocas en lo importante.</p>
            </div>

            <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 border border-slate-800">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Colaboración Total</h3>
                <p className="text-slate-400">Menciones, hilos de comentarios y edición de documentos en vivo. Sin salir de la plataforma.</p>
              </div>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-xs">U{i}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN COMPARATIVA: ANTES Y DESPUÉS --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">¿Por qué cambiar a Project Pulse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl">
            <div className="bg-slate-50 p-12">
              <h3 className="text-red-600 font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-sm">
                <span className="text-xl">✕</span> El Caos Actual
              </h3>
              <ul className="space-y-6 text-slate-500">
                <li className="flex gap-4"><span>•</span> "Busca en el hilo de Slack de hace 3 días"</li>
                <li className="flex gap-4"><span>•</span> Excel desactualizados con versiones V3_FINAL_2</li>
                <li className="flex gap-4"><span>•</span> Reuniones de 1 hora solo para saber qué falta</li>
              </ul>
            </div>
            <div className="bg-blue-600 p-12 text-white">
              <h3 className="text-blue-200 font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-sm">
                <span className="text-xl">✓</span> Con Project Pulse
              </h3>
              <ul className="space-y-6 text-blue-50">
                <li className="flex gap-4"><span className="text-blue-300">★</span> Una sola fuente de verdad para todos</li>
                <li className="flex gap-4"><span className="text-blue-300">★</span> Notificaciones que sí importan</li>
                <li className="flex gap-4"><span className="text-blue-300">★</span> Claridad absoluta en el "Quién" y "Cuándo"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF / STATS --- */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-blue-600">+30%</p>
              <p className="text-slate-500 text-sm font-medium mt-1">Eficiencia de equipo</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-600">10k+</p>
              <p className="text-slate-500 text-sm font-medium mt-1">Proyectos activos</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-600">24/7</p>
              <p className="text-slate-500 text-sm font-medium mt-1">Soporte Premium</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-600">4.9/5</p>
              <p className="text-slate-500 text-sm font-medium mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRECIOS --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Planes para todos los tamaños</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Starter */}
            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold">Starter</h3>
              <p className="text-slate-500 text-sm mb-6">Gratis para siempre</p>
              <div className="text-4xl font-black mb-8">$0</div>
              <ul className="text-left space-y-4 mb-10 text-slate-600">
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Hasta 3 proyectos</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Tareas ilimitadas</li>
                <li className="flex items-center gap-3"><span className="text-green-500">✓</span> App móvil</li>
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-slate-100 font-bold hover:bg-slate-50 transition-all">Empezar ya</button>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 p-10 rounded-[2rem] text-white shadow-2xl relative">
              <div className="absolute top-6 right-6 bg-orange-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Recomendado</div>
              <h3 className="text-xl font-bold">Pro Team</h3>
              <p className="text-slate-400 text-sm mb-6">Para equipos en crecimiento</p>
              <div className="text-4xl font-black mb-8">$15<span className="text-lg text-slate-500">/mes</span></div>
              <ul className="text-left space-y-4 mb-10 text-slate-300">
                <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Proyectos ilimitados</li>
                <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Dashboards avanzados</li>
                <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Soporte prioritario</li>
              </ul>
              <button className="w-full py-4 rounded-xl bg-blue-600 font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">Prueba de 14 días</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (Simplificada) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          <div className="divide-y divide-slate-100">
            <details className="group py-6">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                ¿Cómo funciona la seguridad?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">Encriptación de grado bancario y backups diarios automáticos para que nunca pierdas nada.</p>
            </details>
            <details className="group py-6">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none">
                ¿Puedo cancelar en cualquier momento?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">Sí, sin contratos ni letras pequeñas. Te vas cuando quieras (aunque no querrás).</p>
            </details>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-blue-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Eleva el ritmo de tu equipo</h2>
            <p className="text-blue-100/70 mb-10 max-w-xl mx-auto text-lg">Únete a miles de profesionales que ya han recuperado su tiempo.</p>
            <button onClick={() => router.push("/register")} className="bg-[#FF7400] text-white px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all">
              Crear mi cuenta gratis
            </button>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        © 2026 Project Pulse. Todos los derechos reservados.
      </footer>
    </div>
  );
}