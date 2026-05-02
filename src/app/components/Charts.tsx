"use client"

import { useMemo } from 'react';
import { Project } from '../../../store/useProjectStore';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface ChartsProps {
    projects: Project[];
}

export default function Charts({ projects }: ChartsProps) {
    // 1. Procesar datos para el gráfico circular (Estados)
    const statusData = useMemo(() => {
        const counts = { completado: 0, 'en progreso': 0, pendiente: 0 };

        projects.forEach(p => {
            const status = p.estado.toLowerCase().trim();
            if (status === 'completado') counts.completado++;
            else if (status === 'en progreso') counts['en progreso']++;
            else counts.pendiente++; // Por defecto o "pendiente"
        });

        return [
            { name: 'Completados', value: counts.completado, color: '#10B981' }, // emerald-500
            { name: 'En Progreso', value: counts['en progreso'], color: '#FF7400' }, // Tu naranja personalizado
            { name: 'Pendientes', value: counts.pendiente, color: '#94A3B8' }, // slate-400
        ].filter(item => item.value > 0); // Ocultar los que están en 0
    }, [projects]);

    // 2. Procesar datos para el gráfico de barras (Progreso de proyectos activos)
    const progressData = useMemo(() => {
        return projects
            .filter(p => p.estado.toLowerCase().trim() !== 'completado') // Solo mostrar los no completados
            .sort((a, b) => b.progreso - a.progreso) // Ordenar por mayor progreso
            .slice(0, 5) // Mostrar máximo 5 para no saturar la vista
            .map(p => ({
                name: p.nombre.length > 15 ? p.nombre.substring(0, 15) + '...' : p.nombre,
                progreso: p.progreso,
                nombreCompleto: p.nombre
            }));
    }, [projects]);

    // Tooltip personalizado para el gráfico de barras
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                    <p className="font-semibold text-blue-950 mb-1">{payload[0].payload.nombreCompleto}</p>
                    <p className="text-sm text-[#FF7400] font-medium">
                        Progreso: {payload[0].value}%
                    </p>
                </div>
            );
        }
        return null;
    };

    if (!projects || projects.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm">No hay suficientes datos para mostrar métricas.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[350px]">

            {/* GRÁFICO CIRCULAR: Distribución de Estados */}
            <div className="h-full flex flex-col">
                <h3 className="text-sm font-semibold text-slate-500 mb-4 text-center">Distribución por Estado</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#1E3A8A', fontWeight: 600 }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-sm text-slate-600 font-medium ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* GRÁFICO DE BARRAS: Top Proyectos Activos */}
            <div className="h-full flex flex-col">
                <h3 className="text-sm font-semibold text-slate-500 mb-4 text-center">Progreso de Proyectos Activos (Top 5)</h3>
                {progressData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={progressData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                domain={[0, 100]}
                            />
                            <Tooltip cursor={{ fill: '#F8FAFC' }} content={<CustomTooltip />} />
                            <Bar
                                dataKey="progreso"
                                fill="#FF7400"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-slate-400 text-sm">Todos tus proyectos están completados 🎉</p>
                    </div>
                )}
            </div>

        </div>
    );
}