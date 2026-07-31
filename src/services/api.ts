import {
  mockTasks,
  mockWorkspaces,
  mockProjects,
  mockComments,
  mockActivityLogs,
} from "../data/mockData";
import type { Task, TaskStatus, Comment } from "../types";

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Tasks
  getTasks: async (projectId: string): Promise<Task[]> => {
    await delay(300);
    return mockTasks.filter((t) => t.projectId === projectId);
  },

  updateTaskStatus: async (
    taskId: string,
    newStatus: TaskStatus,
  ): Promise<Task> => {
    await delay(200);
    const task = mockTasks.find((t) => t.id === taskId);
    if (!task) throw new Error("Task not found");
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    return { ...task };
  },

  // Comments
  getComments: async (taskId: string): Promise<Comment[]> => {
    await delay(200);
    return mockComments.filter((c) => c.taskId === taskId);
  },

  // Workspaces & Projects
  getWorkspaces: async () => {
    await delay(200);
    return mockWorkspaces;
  },

  getProjects: async (workspaceId: string) => {
    await delay(200);
    return mockProjects.filter((p) => p.workspaceId === workspaceId);
  },

  // Activity Logs
  getActivityLogs: async (workspaceId: string) => {
    await delay(200);
    return mockActivityLogs.filter((a) => a.workspaceId === workspaceId);
  },
};
