import { z } from "zod";

// Schema for Template ID (positive integer)
export const templateIdSchema = z.number().int().positive();

// Schema for creating a new template
export const createTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

// Schema for updating a template (all fields optional)
export const updateTemplateSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => data.name !== undefined || data.description !== undefined,
    "At least one field must be provided for update",
  );

// Schema for Template response
export const templateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type exports
export type TemplateId = z.infer<typeof templateIdSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type Template = z.infer<typeof templateSchema>;
