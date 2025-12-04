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
                return 'bg-green-500';
            case 'En progreso':
                return 'bg-blue-500';
            case 'Pendiente':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getProgressColorClass = (progreso: number) => {
        if (progreso < 30) {
            return 'bg-red-500';
        } else if (progreso < 70) {
            return 'bg-yellow-500';
        } else {
            return 'bg-green-500';
        }
    };

    return (
        <Link href={`/projects/${id}`}>
            <div className="relative bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer min-h-[14rem] min-w-[100px] flex flex-col justify-between overflow-visible">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-900 whitespace-normal break-words">{nombre}</h3>
                        {descripcion && (
                            <p className="text-gray-900 text-sm mt-2">{descripcion}</p>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full text-white flex-shrink-0 ${getStatusColor(estado)}`}>
                            {estado}
                        </span>
                        {fechaFin && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-200">Fin: {fechaFin}</span>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-gray-600 mb-2 text-sm">Progreso:</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full ${getProgressColorClass(progreso)}`}
                            style={{ width: `${progreso}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;