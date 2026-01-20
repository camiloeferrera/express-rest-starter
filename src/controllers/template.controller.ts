import type { Request, Response } from "express";
import { TemplateModel } from "@models/template.model.js";
import type { Template } from "@models/template.model.js";
import { ERRORS, handleValidationError } from "@utils/errors.js";
import {
  templateIdSchema,
  createTemplateSchema,
  updateTemplateSchema,
} from "@schemas/template.schema.js";

// Get all items
export const getAllTemplates = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const templates = await TemplateModel.getAll();
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error("Error in getAllTemplates:", error);
    res.status(500).json({
      success: false,
      error: ERRORS.TEMPLATE_INTERNAL_SERVER_ERROR,
    });
  }
};

// Get item by ID
export const getTemplateById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res.status(400).json({
        success: false,
        error: ERRORS.TEMPLATE_INVALID_ID_FORMAT,
      });
      return;
    }

    const validation = templateIdSchema.safeParse(parseInt(id, 10));
    if (!validation.success) {
      const errorResponse = handleValidationError(validation.error);
      if (errorResponse) {
        res.status(400).json(errorResponse);
        return;
      }
    }

    const templateId = validation.data!;

    const template = await TemplateModel.getById(templateId);
    if (!template) {
      res.status(404).json({
        success: false,
        error: ERRORS.TEMPLATE_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error("Error in getTemplateById:", error);
    res.status(500).json({
      success: false,
      error: ERRORS.TEMPLATE_INTERNAL_SERVER_ERROR,
    });
  }
};

// Create new item
export const createTemplate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validation = createTemplateSchema.safeParse(req.body);
    if (!validation.success) {
      const errorResponse = handleValidationError(validation.error);
      if (errorResponse) {
        res.status(400).json(errorResponse);
        return;
      }
    }

    const { name, description } = validation.data!;

    const newTemplate = await TemplateModel.create({
      name,
      description: description ?? null,
    });
    res.status(201).json({
      success: true,
      data: newTemplate,
    });
  } catch (error) {
    console.error("Error in createTemplate:", error);
    res.status(500).json({
      success: false,
      error: ERRORS.TEMPLATE_INTERNAL_SERVER_ERROR,
    });
  }
};

// Update item
export const updateTemplate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res.status(400).json({
        success: false,
        error: ERRORS.TEMPLATE_INVALID_ID_FORMAT,
      });
      return;
    }

    const idValidation = templateIdSchema.safeParse(parseInt(id, 10));
    if (!idValidation.success) {
      const errorResponse = handleValidationError(idValidation.error);
      if (errorResponse) {
        res.status(400).json(errorResponse);
        return;
      }
    }

    const bodyValidation = updateTemplateSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      const errorResponse = handleValidationError(bodyValidation.error);
      if (errorResponse) {
        res.status(400).json(errorResponse);
        return;
      }
    }

    const templateId = idValidation.data!;
    const updateData: Partial<
      Omit<Template, "id" | "createdAt" | "updatedAt">
    > = {};
    if (bodyValidation.data!.name !== undefined)
      updateData.name = bodyValidation.data!.name;
    if (bodyValidation.data!.description !== undefined)
      updateData.description = bodyValidation.data!.description ?? null;

    const updatedTemplate = await TemplateModel.update(templateId, updateData);
    if (!updatedTemplate) {
      res.status(404).json({
        success: false,
        error: ERRORS.TEMPLATE_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedTemplate,
    });
  } catch (error) {
    console.error("Error in updateTemplate:", error);
    res.status(500).json({
      success: false,
      error: ERRORS.TEMPLATE_INTERNAL_SERVER_ERROR,
    });
  }
};

// Delete item
export const deleteTemplate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res.status(400).json({
        success: false,
        error: ERRORS.TEMPLATE_INVALID_ID_FORMAT,
      });
      return;
    }

    const validation = templateIdSchema.safeParse(parseInt(id, 10));
    if (!validation.success) {
      const errorResponse = handleValidationError(validation.error);
      if (errorResponse) {
        res.status(400).json(errorResponse);
        return;
      }
    }

    const templateId = validation.data!;

    const deleted = await TemplateModel.delete(templateId);
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: ERRORS.TEMPLATE_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteTemplate:", error);
    res.status(500).json({
      success: false,
      error: ERRORS.TEMPLATE_INTERNAL_SERVER_ERROR,
    });
  }
};
