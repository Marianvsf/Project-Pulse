import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="
      relative 
      w-full mt-auto 
      border-t border-white/10 
      bg-blue-950 
      text-slate-300 font-sans
      
      /* Flexbox para centrar contenido */
      flex flex-col items-center justify-center 
      py-6 gap-4

      /* --- LÍNEA BRILLANTE SUPERIOR (Ajustada a Tonos Oscuros) --- */
      /* Esto crea el efecto de luz sobre el borde superior */
      before:absolute 
      before:top-0 
      before:left-1/2 
      before:-translate-x-1/2 
      before:h-[1px] 
      before:w-1/2 md:before:w-1/3
      before:bg-gradient-to-r 
      before:from-transparent 
      before:via-blue-400/50 
      before:to-transparent
      before:shadow-[0_0_15px_rgba(96,165,250,0.6)]
    ">

      {/* Contenido */}
      <a
        className="group flex items-center gap-3 transition-all duration-300 hover:text-white"
        href="https://github.com/Marianvsf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          Made by
        </span>

        {/* Contenedor del logo: Fondo blanco para que el logo negro resalte */}
        <div className="relative overflow-hidden rounded-full bg-white p-[2px] shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/30 group-hover:scale-110 transition-all duration-300">
          <Image
            className="rounded-full"
            src="/github_black.png"
            alt="GitHub logo"
            width={32}
            height={32}
            priority
          />
        </div>

        <span className="text-sm font-medium tracking-wide group-hover:text-white transition-colors">
          Marian Suárez
        </span>

        {/* Flecha con el acento Naranja del Navbar */}
        <span className="text-[#FF7400] transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      </a>

      {/* (Opcional) Texto de copyright o secundario muy sutil */}
      <div className="text-xs text-white/20">
        © {new Date().getFullYear()} Project Pulse.
      </div>
    </footer>
  )
}