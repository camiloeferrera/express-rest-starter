import { getConnection } from "../database/connection.js";

const pool = await getConnection();

// Define the interface for the model
export interface Template {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Model class with CRUD operations
export class TemplateModel {
  // Get all items
  static async getAll(): Promise<Template[]> {
    try {
      const query = "SELECT * FROM templates ORDER BY created_at DESC";
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching templates: ${error}`);
    }
  }

  // Get item by ID
  static async getById(id: number): Promise<Template | null> {
    try {
      const query = "SELECT * FROM templates WHERE id = $1";
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching template with id ${id}: ${error}`);
    }
  }

  // Create new item
  static async create(
    data: Omit<Template, "id" | "createdAt" | "updatedAt">
  ): Promise<Template> {
    try {
      const query = `
        INSERT INTO templates (name, description, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING *
      `;
      const values = [data.name, data.description];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating template: ${error}`);
    }
  }

  // Update item
  static async update(
    id: number,
    data: Partial<Omit<Template, "id" | "createdAt" | "updatedAt">>
  ): Promise<Template | null> {
    try {
      const fields = [];
      const values = [];
      let paramIndex = 1;

      if (data.name !== undefined) {
        fields.push(`name = $${paramIndex++}`);
        values.push(data.name);
      }
      if (data.description !== undefined) {
        fields.push(`description = $${paramIndex++}`);
        values.push(data.description);
      }
      fields.push(`updated_at = NOW()`);

      if (fields.length === 1) {
        throw new Error("No fields to update");
      }

      const query = `
        UPDATE templates
        SET ${fields.join(", ")}
        WHERE id = $${paramIndex}
        RETURNING *
      `;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error updating template with id ${id}: ${error}`);
    }
  }

  // Delete item
  static async delete(id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM templates WHERE id = $1 RETURNING id";
      const result = await pool.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw new Error(`Error deleting template with id ${id}: ${error}`);
    }
  }
}
