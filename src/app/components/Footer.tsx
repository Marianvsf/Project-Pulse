import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="relative w-full mt-auto bg-[#0B1120] text-slate-300 font-sans flex flex-col items-center justify-center py-8 pb-10 gap-6 z-10 overflow-hidden">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-full h-px bg-white/10 absolute top-0" />
        <div className="w-1/2 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent shadow-[0_0_20px_rgba(96,165,250,0.8)] z-10" />
      </div>
      <a
        href="https://github.com/Marianvsf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,116,0,0.1)] active:scale-95 cursor-pointer"
      >
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-normal text-white/50 transition-colors group-hover:text-white/70">
            Made by
          </span>
          <span className="font-semibold tracking-wide text-white transition-colors">
            Marian Suárez
          </span>
        </div>
        <span className="text-[#FF7400] text-lg font-light leading-none transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
        <div className="relative flex items-center justify-center w-7 h-7 overflow-hidden bg-white rounded-full p-[1.5px] shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/20">
          <Image
            className="object-contain rounded-full"
            src="/github_black.png"
            alt="GitHub de Marian Suárez"
            width={24}
            height={24}
            priority
          />
        </div>
      </a>
      <div className="text-xs tracking-wider text-white/30 font-medium uppercase">
        © {new Date().getFullYear()} Project Pulse.
      </div>
      <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />
    </footer>
  );
};