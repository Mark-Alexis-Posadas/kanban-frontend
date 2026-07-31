// src/components/kanban/KanbanBoard.tsx
import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";

import type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import type { Task, TaskStatus } from "../../types";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../../hooks/useTasks";
import { useUIStore } from "../../stores/useUIStore";

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "BACKLOG", title: "Backlog", color: "bg-slate-400" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-indigo-500" },
  { id: "IN_REVIEW", title: "In Review", color: "bg-amber-500" },
  { id: "DONE", title: "Done", color: "bg-emerald-500" },
];

export const KanbanBoard: React.FC = () => {
  const activeProjectId = useUIStore((state) => state.activeProjectId);
  const { tasks, updateTaskStatus } = useTasks(activeProjectId);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Require pointer movement before trigger to prevent accidental drag on click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    // Check if dropped directly over a column container
    const isOverAColumn = COLUMNS.some((col) => col.id === overId);

    if (isOverAColumn) {
      const newStatus = overId as TaskStatus;
      if (draggedTask.status !== newStatus) {
        updateTaskStatus({ taskId: activeId, newStatus });
      }
      return;
    }

    // Check if dropped over another card
    const targetTask = tasks.find((t) => t.id === overId);
    if (targetTask && draggedTask.status !== targetTask.status) {
      updateTaskStatus({ taskId: activeId, newStatus: targetTask.status });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 h-[calc(100vh-140px)] items-start">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            accentColor={col.color}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>

      {/* Smooth Drag Overlay preview */}
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
