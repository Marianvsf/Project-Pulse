"use client";

import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

interface ChartsProps {
    projects: { estado: string; prioridad: string }[];
}

const Charts = ({ projects }: ChartsProps) => {
    // Datos para el gráfico de barras por estado
    const statusData = projects.reduce((acc, project) => {
        acc[project.estado] = (acc[project.estado] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const barChartData = {
        labels: Object.keys(statusData),
        datasets: [
            {
                label: '# de Proyectos',
                data: Object.values(statusData),
                backgroundColor: ['#2563EB', '#FBBF24', '#10B981'],
            },
        ],
    };

    // Datos para el gráfico de pastel por prioridad
    const priorityData = projects.reduce((acc, project) => {
        acc[project.prioridad] = (acc[project.prioridad] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = {
        labels: Object.keys(priorityData),
        datasets: [
            {
                label: '# de Proyectos',
                data: Object.values(priorityData),
                backgroundColor: ['#DC2626', '#FBBF24', '#10B981'],
                borderColor: ['#DC2626', '#FBBF24', '#10B981'],
                borderWidth: 1,
            },
        ],
    };

    // Datos para el gráfico de líneas
    const lineChartData = {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [
            {
                label: 'En progreso',
                data: [5, 8, 7], // Datos simulados
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Completado',
                data: [2, 4, 6], // Datos simulados
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Pendiente',
                data: [1, 2, 1], // Datos simulados
                borderColor: '#FBBF24',
                backgroundColor: 'rgba(251, 191, 36, 0.5)',
                tension: 0.4,
            },
        ],
    };

    // Opciones compartidas para que todos los charts ocupen el mismo tamaño
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md mb-9">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Proyectos por Estado</h3>
                    <div className="w-full h-64">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
                {/* Gráfico de Líneas */}
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Evolución de Proyectos</h3>
                    <div className="w-full h-64">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
            </div>
            {/* Gráfico de Pastel por Prioridad */}
            <div>
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Proyectos por Prioridad</h3>
                    <div className="w-full h-64">
                        <Pie data={pieChartData} options={chartOptions} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Charts;