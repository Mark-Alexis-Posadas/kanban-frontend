// src/components/kanban/TaskCard.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, Paperclip, Clock } from "lucide-react";
import type { Task, TaskPriority } from "../../types";
import { useUIStore } from "../../stores/useUIStore";
import { cn } from "../../utils/cn";

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<TaskPriority, string> = {
  LOW: "bg-slate-100 text-slate-600 border-slate-200",
  MEDIUM: "bg-blue-50 text-blue-600 border-blue-200",
  HIGH: "bg-amber-50 text-amber-600 border-amber-200",
  URGENT: "bg-rose-50 text-rose-600 border-rose-200",
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const openTaskDetailsModal = useUIStore(
    (state) => state.openTaskDetailsModal,
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => openTaskDetailsModal(task.id)}
      className={cn(
        "bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group select-none",
        isDragging && "opacity-40 border-dashed border-indigo-500 shadow-lg",
      )}
    >
      {/* Priority Tag & Key */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
          {task.projectKey}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded border uppercase",
            priorityColors[task.priority],
          )}
        >
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 mb-3">
        {task.title}
      </h4>

      {/* Card Footer */}
      <div className="flex items-center justify-between text-slate-400 text-[11px] pt-2 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {task.commentsCount > 0 && (
            <span className="flex items-center gap-1 hover:text-slate-600">
              <MessageSquare className="w-3.5 h-3.5" />
              {task.commentsCount}
            </span>
          )}
          {task.attachments && task.attachments.length > 0 && (
            <span className="flex items-center gap-1 hover:text-slate-600">
              <Paperclip className="w-3.5 h-3.5" />
              {task.attachments.length}
            </span>
          )}
        </div>

        {/* Assignee Avatar */}
        {task.assignee ? (
          <img
            src={task.assignee.avatarUrl}
            alt={task.assignee.name}
            title={`Assigned to ${task.assignee.name}`}
            className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50"
          />
        ) : (
          <span className="w-5 h-5 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[9px] text-slate-400">
            ?
          </span>
        )}
      </div>
    </div>
  );
};
