import type { Request, Response } from "express";
import { TemplateModel } from "@/models/template.model.js";

// Get all items
export const getAllTemplates = async (
  req: Request,
  res: Response
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
      message: "Internal server error",
    });
  }
};

// Get item by ID
export const getTemplateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }

    const template = await TemplateModel.getById(templateId);
    if (!template) {
      res.status(404).json({
        success: false,
        message: "Template not found",
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
      message: "Internal server error",
    });
  }
};

// Create new item
export const createTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: "Name is required",
      });
      return;
    }

    const newTemplate = await TemplateModel.create({ name, description });
    res.status(201).json({
      success: true,
      data: newTemplate,
    });
  } catch (error) {
    console.error("Error in createTemplate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update item
export const updateTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }
    const templateId = parseInt(id, 10);
    const { name, description } = req.body;

    if (isNaN(templateId)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }

    const updatedTemplate = await TemplateModel.update(templateId, {
      name,
      description,
    });
    if (!updatedTemplate) {
      res.status(404).json({
        success: false,
        message: "Template not found",
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
      message: "Internal server error",
    });
  }
};

// Delete item
export const deleteTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }
    const templateId = parseInt(id, 10);

    if (isNaN(templateId)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
      return;
    }

    const deleted = await TemplateModel.delete(templateId);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Template not found",
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
      message: "Internal server error",
    });
  }
};
