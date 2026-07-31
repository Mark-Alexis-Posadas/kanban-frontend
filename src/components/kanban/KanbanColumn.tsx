// src/components/kanban/KanbanColumn.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { Task, TaskStatus } from "../../types";
import { TaskCard } from "./TaskCard";
import { useUIStore } from "../../stores/useUIStore";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  accentColor: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  tasks,
  accentColor,
}) => {
  const { setNodeRef } = useDroppable({ id });
  const openCreateTaskModal = useUIStore((state) => state.openCreateTaskModal);

  const taskIds = tasks.map((t) => t.id);

  return (
    <div className="flex flex-col bg-slate-100/80 rounded-xl p-3 w-72 shrink-0 border border-slate-200/60 max-h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${accentColor}`} />
          <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase">
            {title}
          </h3>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={openCreateTaskModal}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          title="Add task to column"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task Cards Drop Area */}
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-0.5 min-h-[150px]"
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
