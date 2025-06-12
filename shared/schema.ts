import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'music' | 'video' | 'enhanced'
  content: text("content").notNull(), // lyrics or video concept
  settings: text("settings").notNull(), // JSON string of generation settings
  status: text("status").notNull().default("pending"), // 'pending' | 'processing' | 'completed' | 'failed'
  resultUrl: text("result_url"), // URL to generated media file
  duration: integer("duration"), // in seconds
  createdAt: timestamp("created_at").defaultNow(),
});

export const exports = pgTable("exports", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  format: text("format").notNull(), // 'mp3' | 'wav' | 'flac' | 'mp4' | 'mov' | 'webm'
  quality: text("quality").notNull(), // 'high' | 'medium' | 'low'
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // in bytes
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  messageType: text("message_type").notNull().default("text"), // 'text' | 'system' | 'file' | 'reaction'
  createdAt: timestamp("created_at").defaultNow(),
});

export const collaborators = pgTable("collaborators", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  username: text("username").notNull(),
  role: text("role").notNull().default("viewer"), // 'owner' | 'editor' | 'viewer'
  isOnline: boolean("is_online").notNull().default(false),
  lastSeen: timestamp("last_seen").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertExportSchema = createInsertSchema(exports).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertCollaboratorSchema = createInsertSchema(collaborators).omit({
  id: true,
  lastSeen: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertExport = z.infer<typeof insertExportSchema>;
export type Export = typeof exports.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertCollaborator = z.infer<typeof insertCollaboratorSchema>;
export type Collaborator = typeof collaborators.$inferSelect;
