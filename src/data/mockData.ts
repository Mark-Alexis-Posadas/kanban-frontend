import type {
  User,
  Workspace,
  Project,
  Task,
  Comment,
  ActivityLog,
} from "../types";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Mark Alexis",
    email: "mark@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
  },
  {
    id: "u2",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "u3",
    name: "Alex Rivera",
    email: "alex@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

export const mockWorkspaces: Workspace[] = [
  {
    id: "w1",
    name: "Dev Studio",
    slug: "dev-studio",
    description: "Main tech workspace for software development.",
    members: [
      { userId: "u1", user: mockUsers[0], role: "ADMIN" },
      { userId: "u2", user: mockUsers[1], role: "MEMBER" },
      { userId: "u3", user: mockUsers[2], role: "MEMBER" },
    ],
    createdAt: "2026-01-10T08:00:00Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    workspaceId: "w1",
    name: "Project Management Tool",
    key: "PMT",
    description: "Mini Jira/Trello web app built with React & Tailwind CSS.",
    createdAt: "2026-02-01T10:00:00Z",
  },
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    projectKey: "PMT-1",
    projectId: "p1",
    title: "Setup Vite, React, and Tailwind CSS",
    description: "Initial project setup with basic styling configuration.",
    status: "DONE",
    priority: "HIGH",
    assigneeId: "u1",
    assignee: mockUsers[0],
    reporterId: "u1",
    reporter: mockUsers[0],
    commentsCount: 2,
    order: 0,
    createdAt: "2026-02-01T10:30:00Z",
    updatedAt: "2026-02-01T11:00:00Z",
  },
  {
    id: "t2",
    projectKey: "PMT-2",
    projectId: "p1",
    title: "Build Kanban Board with Drag and Drop",
    description: "Implement @dnd-kit for seamless column and card dragging.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    assigneeId: "u1",
    assignee: mockUsers[0],
    reporterId: "u2",
    reporter: mockUsers[1],
    commentsCount: 5,
    order: 0,
    createdAt: "2026-02-02T09:00:00Z",
    updatedAt: "2026-02-02T14:00:00Z",
  },
  {
    id: "t3",
    projectKey: "PMT-3",
    projectId: "p1",
    title: "Integrate Task Details Modal & Comments",
    description: "Allow users to open tasks, edit fields, and leave comments.",
    status: "BACKLOG",
    priority: "MEDIUM",
    assigneeId: "u2",
    assignee: mockUsers[1],
    reporterId: "u1",
    reporter: mockUsers[0],
    commentsCount: 0,
    order: 0,
    createdAt: "2026-02-03T11:00:00Z",
    updatedAt: "2026-02-03T11:00:00Z",
  },
  {
    id: "t4",
    projectKey: "PMT-4",
    projectId: "p1",
    title: "Setup Activity Log Feed",
    description: "Track user changes (status updates, new comments).",
    status: "BACKLOG",
    priority: "LOW",
    reporterId: "u1",
    reporter: mockUsers[0],
    commentsCount: 0,
    order: 1,
    createdAt: "2026-02-03T12:00:00Z",
    updatedAt: "2026-02-03T12:00:00Z",
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    taskId: "t2",
    userId: "u2",
    user: mockUsers[1],
    content: "Are we using `@dnd-kit/core` or `@hello-pangea/dnd` for this?",
    createdAt: "2026-02-02T10:00:00Z",
  },
  {
    id: "c2",
    taskId: "t2",
    userId: "u1",
    user: mockUsers[0],
    content:
      "We went with `@dnd-kit` for better customization and accessibility!",
    createdAt: "2026-02-02T10:15:00Z",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "a1",
    workspaceId: "w1",
    userId: "u1",
    user: mockUsers[0],
    action: "moved task from IN_PROGRESS to DONE",
    targetTitle: "PMT-1 Setup Vite, React, and Tailwind CSS",
    createdAt: "2026-02-01T11:00:00Z",
  },
  {
    id: "a2",
    workspaceId: "w1",
    userId: "u2",
    user: mockUsers[1],
    action: "commented on",
    targetTitle: "PMT-2 Build Kanban Board with Drag and Drop",
    createdAt: "2026-02-02T10:00:00Z",
  },
];
