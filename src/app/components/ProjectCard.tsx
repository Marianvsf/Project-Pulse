import Link from 'next/link';

interface ProjectCardProps {
    id: string;
    nombre: string;
    estado: string;
    progreso: number;
    descripcion?: string;
    fechaFin?: string;
}

const ProjectCard = ({ id, nombre, estado, progreso, descripcion, fechaFin }: ProjectCardProps) => {

    // Función para asignar color basado en el estado
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completado':
                return 'bg-emerald-500 text-white';
            case 'En Progreso': // Asegúrate que coincida con tu DB (mayúsculas/minúsculas)
            case 'En progreso':
                return 'bg-blue-500 text-white';
            case 'Pendiente':
                return 'bg-amber-500 text-white';
            default:
                return 'bg-slate-400 text-white';
        }
    };

    const getProgressColorClass = (progreso: number) => {
        if (progreso < 30) return 'bg-red-500';
        if (progreso < 70) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <Link href={`/projects/${id}`} className="block h-full">
            <div className="
                group relative bg-white 
                /* --- TAMAÑO FIJO --- */
                h-[280px] w-full 
                flex flex-col justify-between 
                
                rounded-2xl p-6 
                border border-gray-100 shadow-sm 
                hover:shadow-xl hover:-translate-y-1 
                transition-all duration-300 cursor-pointer
            ">

                {/* PARTE SUPERIOR: Título, Badge y Descripción */}
                <div>
                    <div className="flex justify-between items-start gap-3 mb-3">
                        {/* Título con límite de 2 líneas */}
                        <h3 className="text-lg font-bold text-blue-950 leading-tight line-clamp-2" title={nombre}>
                            {nombre}
                        </h3>

                        {/* Badge de Estado */}
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm flex-shrink-0 ${getStatusColor(estado)}`}>
                            {estado}
                        </span>
                    </div>

                    {/* Descripción con límite de líneas (line-clamp) */}
                    {descripcion ? (
                        <p className="text-slate-500 text-md leading-relaxed line-clamp-3">
                            {descripcion}
                        </p>
                    ) : (
                        <p className="text-slate-300 text-md italic">
                            Sin descripción disponible.
                        </p>
                    )}
                </div>

                {/* PARTE INFERIOR: Fecha y Progreso */}
                <div className="mt-4">
                    {fechaFin && (
                        <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Entrega: {fechaFin}</span>
                        </div>
                    )}

                    {/* Barra de Progreso */}
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-slate-500">Progreso</span>
                        <span className="text-xs font-bold text-blue-950">{progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColorClass(progreso)}`}
                            style={{ width: `${progreso}%` }}
                        ></div>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default ProjectCard;