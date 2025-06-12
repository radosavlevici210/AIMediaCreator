import { 
  projects, exports, messages, collaborators,
  type Project, type InsertProject, 
  type Export, type InsertExport,
  type Message, type InsertMessage,
  type Collaborator, type InsertCollaborator
} from "@shared/schema";

export interface IStorage {
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  updateProjectStatus(id: number, status: string, resultUrl?: string | null): Promise<Project | undefined>;
  
  // Export methods
  createExport(exportData: InsertExport): Promise<Export>;
  getExportsByProject(projectId: number): Promise<Export[]>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByProject(projectId: number): Promise<Message[]>;
  
  // Collaborator methods
  addCollaborator(collaborator: InsertCollaborator): Promise<Collaborator>;
  getCollaboratorsByProject(projectId: number): Promise<Collaborator[]>;
  updateCollaboratorStatus(projectId: number, username: string, isOnline: boolean): Promise<Collaborator | undefined>;
  
  // Stats methods
  getProjectStats(): Promise<{
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  }>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private exports: Map<number, Export>;
  private currentProjectId: number;
  private currentExportId: number;

  constructor() {
    this.projects = new Map();
    this.exports = new Map();
    this.currentProjectId = 1;
    this.currentExportId = 1;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async updateProjectStatus(id: number, status: string, resultUrl?: string): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, status, resultUrl };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async createExport(insertExport: InsertExport): Promise<Export> {
    const id = this.currentExportId++;
    const exportData: Export = {
      ...insertExport,
      id,
      createdAt: new Date(),
    };
    this.exports.set(id, exportData);
    return exportData;
  }

  async getExportsByProject(projectId: number): Promise<Export[]> {
    return Array.from(this.exports.values())
      .filter(exp => exp.projectId === projectId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getProjectStats(): Promise<{
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  }> {
    const allProjects = Array.from(this.projects.values());
    const completed = allProjects.filter(p => p.status === 'completed');
    const processing = allProjects.filter(p => p.status === 'processing');
    
    return {
      totalProjects: allProjects.length,
      completedProjects: completed.length,
      processingProjects: processing.length,
      avgProcessingTime: 2.3, // Mock average
    };
  }
}

export const storage = new MemStorage();
