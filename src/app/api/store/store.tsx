import create from "zustand";
import projectsData from "../data/projects.json";

export interface Project {
    id: string;
    nombre: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    progreso: number;
    tareas: { id: number; nombre: string; completado: boolean }[];
    equipo: string[];
    fechaInicio: string;
    fechaFin: string;
}

type State = {
    projects: Project[];
    searchTerm: string;
    statusFilter?: string;
    setProjects: (p: Project[]) => void;
    setSearchTerm: (s: string) => void;
    setStatusFilter: (s?: string) => void;
};

export const useProjectStore = create<State>((set) => ({
    projects: projectsData as Project[],
    searchTerm: "",
    statusFilter: undefined,
    setProjects: (p) => set({ projects: p }),
    setSearchTerm: (s) => set({ searchTerm: s }),
    setStatusFilter: (s) => set({ statusFilter: s }),
}));