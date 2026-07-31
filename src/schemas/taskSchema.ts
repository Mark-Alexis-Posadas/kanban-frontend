import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Ang title ay dapat may hindi bababa sa 3 characters"),
  description: z.string().optional(),
  status: z.enum(["BACKLOG", "IN_PROGRESS", "IN_REVIEW", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assigneeId: z.string().optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
