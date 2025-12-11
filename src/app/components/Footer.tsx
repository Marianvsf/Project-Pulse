import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="
      relative bg-gradient-to-t from-white-200 via-white to-gray-100
      mt-auto w-full flex-shrink-0 flex gap-3 flex-wrap items-center justify-center 
      text-blue-950 p-4 font-mono
      /* --- CONFIGURACIÓN DE LA LÍNEA BRILLANTE --- */
      before:absolute 
      before:top-0 
      before:left-1/2 
      before:-translate-x-1/2 
      
      /* Altura y Ancho */
      before:h-[2px] 
      before:w-[40%] 
      
      /* EL EFECTO DE BRILLO (Degradado + Sombra) */
      before:bg-gradient-to-r 
      before:from-transparent 
      before:via-blue-950 
      before:to-transparent
      
      before:shadow-[0_0_12px_rgba(23,37,84,0.6)]
    ">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/Marianvsf"
        target="_blank"
        rel="noopener noreferrer"
      >Made by →
        <Image
          className="logo w-9 h-9 rounded-full border border-black"
          src="/github_black.png"
          alt="logo"
          width={35}
          height={35}
          priority
        />
        Marian Suárez
      </a>
    </footer>
  )
}