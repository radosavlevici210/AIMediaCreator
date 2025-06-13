import { 
  projects, exports, messages, securityLogs, users, contentLibrary, productionSettings,
  type Project, type InsertProject, 
  type Export, type InsertExport,
  type Message, type InsertMessage,
  type SecurityLog, type InsertSecurityLog,
  type User, type InsertUser,
  type ContentLibrary, type InsertContentLibrary,
  type ProductionSettings, type InsertProductionSettings
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
  
  // Security methods
  logSecurityEvent(securityLog: InsertSecurityLog): Promise<SecurityLog>;
  getSecurityLogs(projectId?: number): Promise<SecurityLog[]>;
  checkSuspiciousActivity(user: string): Promise<boolean>;
  
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUser(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(email: string, role: string): Promise<User | undefined>;
  updateUserStatus(email: string, status: string): Promise<User | undefined>;
  
  // Content Library methods
  createContent(content: InsertContentLibrary): Promise<ContentLibrary>;
  getContent(id: number): Promise<ContentLibrary | undefined>;
  getAllContent(): Promise<ContentLibrary[]>;
  getContentByUser(createdBy: string): Promise<ContentLibrary[]>;
  
  // Production Settings methods
  createProductionSettings(settings: InsertProductionSettings): Promise<ProductionSettings>;
  getProductionSettings(userId: string): Promise<ProductionSettings | undefined>;
  updateProductionSettings(userId: string, settings: Partial<InsertProductionSettings>): Promise<ProductionSettings | undefined>;
  
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
  private messages: Map<number, Message>;
  private securityLogs: Map<number, SecurityLog>;
  private currentProjectId: number;
  private currentExportId: number;
  private currentMessageId: number;
  private currentSecurityLogId: number;
  private suspiciousUsers: Set<string>;

  constructor() {
    this.projects = new Map();
    this.exports = new Map();
    this.messages = new Map();
    this.securityLogs = new Map();
    this.currentProjectId = 1;
    this.currentExportId = 1;
    this.currentMessageId = 1;
    this.currentSecurityLogId = 1;
    this.suspiciousUsers = new Set([
      'Cristina Laura',
      'Maxim Tudor', 
      'Organ Cornel',
      'Mr Brown',
      'Citric',
      'Atlasian'
    ]);
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

  async updateProjectStatus(id: number, status: string, resultUrl?: string | null): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, status, resultUrl: resultUrl ?? null };
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

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesByProject(projectId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.projectId === projectId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async logSecurityEvent(insertSecurityLog: InsertSecurityLog): Promise<SecurityLog> {
    const id = this.currentSecurityLogId++;
    const securityLog: SecurityLog = {
      ...insertSecurityLog,
      id,
      createdAt: new Date(),
    };
    this.securityLogs.set(id, securityLog);
    return securityLog;
  }

  async getSecurityLogs(projectId?: number): Promise<SecurityLog[]> {
    const logs = Array.from(this.securityLogs.values());
    if (projectId) {
      return logs.filter(log => log.projectId === projectId)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    }
    return logs.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async checkSuspiciousActivity(user: string): Promise<boolean> {
    return this.suspiciousUsers.has(user);
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
      avgProcessingTime: 2.3,
    };
  }
}

export const storage = new MemStorage();
