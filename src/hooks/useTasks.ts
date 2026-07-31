import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { TaskStatus } from "../types";

export const useTasks = (projectId: string | null) => {
  const queryClient = useQueryClient();

  // Fetch tasks
  const tasksQuery = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => (projectId ? api.getTasks(projectId) : Promise.resolve([])),
    enabled: !!projectId,
  });

  // Mutate task status (Drag and Drop / Dropdown)
  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      newStatus,
    }: {
      taskId: string;
      newStatus: TaskStatus;
    }) => api.updateTaskStatus(taskId, newStatus),
    onSuccess: () => {
      // Refresh task list after status change
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    updateTaskStatus: updateStatusMutation.mutate,
  };
};
