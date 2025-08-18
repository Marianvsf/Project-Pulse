import Link from 'next/link';

interface ProjectCardProps {
    id: string;
    nombre: string;
    estado: string;
    progreso: number;
}

const ProjectCard = ({ id, nombre, estado, progreso }: ProjectCardProps) => {
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{nombre}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full text-white ${getStatusColor(estado)}`}>
                        {estado}
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Progreso:</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className={`h-2.5 rounded-full ${getProgressColorClass(progreso)}`}
                        style={{ width: `${progreso}%` }}
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;