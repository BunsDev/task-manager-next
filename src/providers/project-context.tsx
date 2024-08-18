"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  categories: { id: string; name: string }[];
  tasks: { id: string; title: string; description: string | null; priority: string; deadline: Date; projectId: string }[];
  teamMembers?: string[];
  ownerId: string;
  User?: string[];
}

interface ProjectContextType {
  projects: Project[];
  setProjects: (projects: Project[] | ((prevProjects: Project[]) => Project[])) => void;

}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export { ProjectProvider, useProject };
