// src/stores/useUIStore.ts
import { create } from "zustand";

interface UIState {
  // Active Navigation Context
  activeWorkspaceId: string | null;
  activeProjectId: string | null;
  setActiveWorkspaceId: (id: string | null) => void;
  setActiveProjectId: (id: string | null) => void;

  // Modal States
  isCreateTaskModalOpen: boolean;
  selectedTaskId: string | null; // For Task Details Modal

  // Actions
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
  openTaskDetailsModal: (taskId: string) => void;
  closeTaskDetailsModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeWorkspaceId: "w1", // Default sa mock workspace 'w1'
  activeProjectId: "p1", // Default sa mock project 'p1'
  setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),

  isCreateTaskModalOpen: false,
  selectedTaskId: null,

  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),
  openTaskDetailsModal: (taskId) => set({ selectedTaskId: taskId }),
  closeTaskDetailsModal: () => set({ selectedTaskId: null }),
}));
