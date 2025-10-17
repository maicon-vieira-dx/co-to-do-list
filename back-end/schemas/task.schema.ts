import z from "zod";

export const TaskSchema = z.object({
  title: z.string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(50, "O título deve ter no máximo 50 caracteres"),
  description: z.string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(255, "A descrição deve ter no máximo 255 caracteres"),
  status: z.string().min(2, "Status obrigatória"),
  priority: z.string().min(2, "Prioridade obrigatória"),
  category: z.string().min(2, "Categoria obrigatória"),
  tags: z.array(z.string()).optional(),
});

export type TaskInput = z.infer<typeof TaskSchema>;
