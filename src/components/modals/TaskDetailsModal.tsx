// src/components/modals/TaskDetailsModal.tsx
import React, { useState } from "react";
import {
  X,
  Clock,
  User as UserIcon,
  Send,
  Paperclip,
  MessageSquare,
  Trash2,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useUIStore } from "../../stores/useUIStore";
import { mockTasks, mockComments, mockUsers } from "../../data/mockData";
import { Comment, TaskPriority, TaskStatus } from "../../types";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "../../utils/cn";

export const TaskDetailsModal: React.FC = () => {
  const selectedTaskId = useUIStore((state) => state.selectedTaskId);
  const closeDetailsModal = useUIStore((state) => state.closeTaskDetailsModal);
  const activeProjectId = useUIStore((state) => state.activeProjectId);
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState("");

  if (!selectedTaskId) return null;

  const task = mockTasks.find((t) => t.id === selectedTaskId);
  const taskComments = mockComments.filter((c) => c.taskId === selectedTaskId);
  const currentUser = mockUsers[0]; // Mark Alexis

  if (!task) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      taskId: task.id,
      userId: currentUser.id,
      user: currentUser,
      content: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    mockComments.push(newComment);
    task.commentsCount += 1;

    setCommentText("");
    queryClient.invalidateQueries({ queryKey: ["tasks", activeProjectId] });
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    queryClient.invalidateQueries({ queryKey: ["tasks", activeProjectId] });
  };

  const handlePriorityChange = (newPriority: TaskPriority) => {
    task.priority = newPriority;
    task.updatedAt = new Date().toISOString();
    queryClient.invalidateQueries({ queryKey: ["tasks", activeProjectId] });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
              {task.projectKey}
            </span>
            <span className="text-xs text-slate-400">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeDetailsModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 leading-snug">
              {task.title}
            </h2>
          </div>

          {/* Controls Bar: Status & Priority */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Status
              </p>
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as TaskStatus)
                }
                className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Priority
              </p>
              <select
                value={task.priority}
                onChange={(e) =>
                  handlePriorityChange(e.target.value as TaskPriority)
                }
                className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Assignee
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                {task.assignee ? (
                  <>
                    <img
                      src={task.assignee.avatarUrl}
                      alt=""
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-xs font-medium text-slate-700 truncate">
                      {task.assignee.name}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Unassigned
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Description
            </h3>
            <div className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed min-h-[80px]">
              {task.description || (
                <span className="text-slate-400 italic">
                  No description provided for this task.
                </span>
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Activity & Comments Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Comments ({taskComments.length})
                </h3>
              </div>
            </div>

            {/* New Comment Input Box */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full border border-slate-200 shrink-0 mt-0.5"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-40 flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </div>
            </form>

            {/* Comments Stream */}
            <div className="space-y-3 pt-2">
              {taskComments.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  No comments yet. Be the first to leave one!
                </p>
              ) : (
                taskComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 p-3 bg-slate-50/70 rounded-xl border border-slate-100"
                  >
                    <img
                      src={comment.user.avatarUrl}
                      alt={comment.user.name}
                      className="w-6 h-6 rounded-full border border-slate-200 shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-800">
                          {comment.user.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(comment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-normal">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Reporter:{" "}
            <strong className="text-slate-600">{task.reporter.name}</strong>
          </span>
          <span>Updated {new Date(task.updatedAt).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};
