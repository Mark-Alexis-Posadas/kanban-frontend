import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { useUIStore } from "../../stores/useUIStore";
import { createTaskSchema } from "../../schemas/taskSchema";
import type { CreateTaskFormData } from "../../schemas/taskSchema";
import { mockUsers, mockTasks } from "../../data/mockData";
import type { Task } from "../../types";
import { useQueryClient } from "@tanstack/react-query";

export const CreateTaskModal: React.FC = () => {
  const isOpen = useUIStore((state) => state.isCreateTaskModalOpen);
  const closeModal = useUIStore((state) => state.closeCreateTaskModal);
  const activeProjectId = useUIStore((state) => state.activeProjectId);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "BACKLOG",
      priority: "MEDIUM",
      assigneeId: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: CreateTaskFormData) => {
    // Simulate API save logic
    await new Promise((resolve) => setTimeout(resolve, 300));

    const assignee = mockUsers.find((u) => u.id === data.assigneeId);
    const currentUser = mockUsers[0]; // Mark Alexis

    const newTask: Task = {
      id: `t-${Date.now()}`,
      projectKey: `PMT-${mockTasks.length + 1}`,
      projectId: activeProjectId || "p1",
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assigneeId: data.assigneeId || undefined,
      assignee,
      reporterId: currentUser.id,
      reporter: currentUser,
      commentsCount: 0,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update mock dataset & cache
    mockTasks.push(newTask);
    queryClient.invalidateQueries({ queryKey: ["tasks", activeProjectId] });

    reset();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Create New Task</h3>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Fix navbar responsiveness"
              {...register("title")}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {errors.title && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Status & Priority Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                {...register("priority")}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          {/* Assignee Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assignee
            </label>
            <select
              {...register("assigneeId")}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Unassigned</option>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Add details or context for this task..."
              {...register("description")}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors disabled:opacity-50 shadow-sm"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
