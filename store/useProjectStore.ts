import { create } from "zustand";

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

type CreateProjectInput = Omit<Project, "id">;

const toProject = (project: {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  progreso: number;
  tareas: unknown;
  equipo: unknown;
  fechaInicio: string;
  fechaFin: string;
}): Project => ({
  id: project.id,
  nombre: project.nombre,
  descripcion: project.descripcion,
  estado: project.estado,
  prioridad: project.prioridad,
  progreso: project.progreso,
  tareas: Array.isArray(project.tareas)
    ? (project.tareas as Project["tareas"])
    : [],
  equipo: Array.isArray(project.equipo) ? (project.equipo as string[]) : [],
  fechaInicio: project.fechaInicio,
  fechaFin: project.fechaFin,
});

type State = {
  projects: Project[];
  searchTerm: string;
  statusFilter?: string;
  isLoading: boolean;
  error?: string;
  setProjects: (p: Project[]) => void;
  setSearchTerm: (s: string) => void;
  setStatusFilter: (s?: string) => void;
  loadProjects: () => Promise<void>;
  createProject: (input: CreateProjectInput) => Promise<Project>;
};

export const useProjectStore = create<State>((set) => ({
  projects: [],
  searchTerm: "",
  statusFilter: undefined,
  isLoading: false,
  error: undefined,
  setProjects: (p) => set({ projects: p }),
  setSearchTerm: (s) => set({ searchTerm: s }),
  setStatusFilter: (s) => set({ statusFilter: s }),
  loadProjects: async () => {
    set({ isLoading: true, error: undefined });
    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("No se pudieron cargar los proyectos");
      }
      const data = (await response.json()) as {
        projects: Array<{
          id: string;
          nombre: string;
          descripcion: string;
          estado: string;
          prioridad: string;
          progreso: number;
          tareas: unknown;
          equipo: unknown;
          fechaInicio: string;
          fechaFin: string;
        }>;
      };
      set({ projects: data.projects.map(toProject), isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los proyectos",
      });
    }
  },
  createProject: async (input) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = (await response.json()) as {
      message?: string;
      project?: {
        id: string;
        nombre: string;
        descripcion: string;
        estado: string;
        prioridad: string;
        progreso: number;
        tareas: unknown;
        equipo: unknown;
        fechaInicio: string;
        fechaFin: string;
      };
    };

    if (!response.ok || !data.project) {
      throw new Error(data.message || "No se pudo crear el proyecto");
    }

    const newProject = toProject(data.project);
    set((state) => ({ projects: [newProject, ...state.projects] }));
    return newProject;
  },
}));

export default useProjectStore;
