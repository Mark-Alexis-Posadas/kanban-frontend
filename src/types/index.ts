// src/types/index.ts

export type Role = "ADMIN" | "MEMBER" | "VIEWER";

export type TaskStatus = "BACKLOG" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface WorkspaceMember {
  userId: string;
  user: User;
  role: Role;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  members: WorkspaceMember[];
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  key: string; // e.g., "PROJ", "VET" for task IDs like PROJ-101
  description?: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number; // in bytes
  uploadedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectKey: string; // e.g., "PROJ-101"
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assignee?: User;
  reporterId: string;
  reporter: User;
  dueDate?: string;
  attachments?: Attachment[];
  commentsCount: number;
  order: number; // Para sa Kanban positioning
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  user: User;
  action: string; // e.g., "moved task", "created comment"
  targetTitle: string;
  createdAt: string;
}
