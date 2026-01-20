import { z } from "zod";

// Zod schemas for Template validation
export const TemplateCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const TemplateUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
