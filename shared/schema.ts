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

export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  suspicious_user: text("suspicious_user").notNull(),
  action: text("action").notNull(), // 'unauthorized_access' | 'theft_attempt' | 'copyright_violation'
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  severity: text("severity").notNull().default("medium"), // 'low' | 'medium' | 'high' | 'critical'
  blocked: boolean("blocked").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"), // 'root', 'admin', 'user', 'collaborator'
  status: text("status").notNull().default("active"), // 'active', 'inactive', 'pending'
  permissions: text("permissions").array().default([]),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contentLibrary = pgTable("content_library", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'video', 'music', 'animation', 'lyrics'
  duration: text("duration"),
  quality: text("quality").notNull(),
  fileSize: text("file_size"),
  fileUrl: text("file_url"),
  thumbnailUrl: text("thumbnail_url"),
  metadata: text("metadata"), // JSON string for additional data
  tags: text("tags").array().default([]),
  createdBy: text("created_by").notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productionSettings = pgTable("production_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  aiModel: text("ai_model").notNull().default("cinematic-pro"),
  quality: text("quality").notNull().default("4k"),
  audioEnhancement: text("audio_enhancement").notNull().default("dolby-atmos"),
  maxDuration: integer("max_duration").notNull().default(2580), // 43 hours in minutes
  enableRealTimeCollab: boolean("enable_real_time_collab").default(true),
  enableAdvancedAI: boolean("enable_advanced_ai").default(true),
  settings: text("settings"), // JSON string for additional settings
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

export const insertSecurityLogSchema = createInsertSchema(securityLogs).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentLibrarySchema = createInsertSchema(contentLibrary).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductionSettingsSchema = createInsertSchema(productionSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertExport = z.infer<typeof insertExportSchema>;
export type Export = typeof exports.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertSecurityLog = z.infer<typeof insertSecurityLogSchema>;
export type SecurityLog = typeof securityLogs.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContentLibrary = z.infer<typeof insertContentLibrarySchema>;
export type ContentLibrary = typeof contentLibrary.$inferSelect;
export type InsertProductionSettings = z.infer<typeof insertProductionSettingsSchema>;
export type ProductionSettings = typeof productionSettings.$inferSelect;
