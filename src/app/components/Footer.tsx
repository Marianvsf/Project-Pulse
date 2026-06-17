import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="relative w-full mt-auto bg-[#050B14] text-slate-300 font-sans flex flex-col items-center justify-center py-12 gap-8 z-10 overflow-hidden border-t border-white/5">

      {/* 1. Cyber-Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* 2. Futuristic Top Laser Line */}
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-full h-[1px] bg-white/5 absolute top-0" />
        <div className="w-3/4 md:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8),0_0_30px_rgba(34,211,238,0.4)] z-10" />
      </div>

      {/* 3. Holographic Button */}
      <a
        href="https://github.com/Marianvsf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] active:scale-95 cursor-pointer overflow-hidden"
      >
        {/* Hover Glare Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

        <div className="flex items-center gap-2 text-sm z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400/70 transition-colors group-hover:text-cyan-400">
            Created_By
          </span>
          <span className="font-semibold tracking-wider text-white transition-all group-hover:text-cyan-50 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            Marian Suárez
          </span>
        </div>

        {/* Neon Arrow */}
        <span className="text-[#FF7400] text-xl font-light leading-none transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 drop-shadow-[0_0_5px_rgba(255,116,0,0.8)] z-10">
          »
        </span>

        {/* Avatar Container with glowing ring */}
        <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-white/10 backdrop-blur-sm rounded-full p-[1.5px] ring-1 ring-white/20 transition-all duration-300 group-hover:ring-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:scale-110 z-10">
          <Image
            className="object-contain rounded-full bg-white transition-all duration-300"
            src="/github_black.png"
            alt="GitHub de Marian Suárez"
            width={26}
            height={26}
            priority
          />
        </div>
      </a>

      {/* 4. System Status & Copyright */}
      <div className="flex flex-col items-center gap-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <div className="text-[10px] tracking-[0.3em] text-cyan-400/50 font-mono uppercase">
            System Online
          </div>
        </div>
        <div className="text-xs tracking-widest text-white/30 font-medium uppercase mt-1">
          © {new Date().getFullYear()} Project Pulse_
        </div>
      </div>

      {/* 5. Core Energy Glows */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[400px] h-[120px] bg-cyan-600/15 blur-[70px] rounded-full pointer-events-none" />
    </footer>
  );
};