import { getConnection, sql } from "@database/connection.js";

const pool = await getConnection();

// Define the interface for the model
export interface Template {
  id?: number;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Model class with CRUD operations
export class TemplateModel {
  // Get all items
  static async getAll(): Promise<Template[]> {
    try {
      const result = await pool
        .request()
        .query("SELECT * FROM templates ORDER BY created_at DESC");
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching templates: ${error}`);
    }
  }

  // Get item by ID
  static async getById(id: number): Promise<Template | null> {
    try {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM templates WHERE id = @id");
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error(`Error fetching template with id ${id}: ${error}`);
    }
  }

  // Create new item
  static async create(
    data: Omit<Template, "id" | "created_at" | "updated_at">
  ): Promise<Template> {
    try {
      const result = await pool
        .request()
        .input("name", sql.NVarChar, data.name)
        .input("description", sql.NVarChar, data.description).query(`
          INSERT INTO templates (name, description, created_at, updated_at)
          OUTPUT INSERTED.*
          VALUES (@name, @description, GETDATE(), GETDATE())
        `);
      return result.recordset[0];
    } catch (error) {
      throw new Error(`Error creating template: ${error}`);
    }
  }

  // Update item
  static async update(
    id: number,
    data: Partial<Omit<Template, "id" | "created_at" | "updated_at">>
  ): Promise<Template | null> {
    try {
      const fields = [];
      const request = pool.request();

      if (data.name !== undefined) {
        fields.push("name = @name");
        request.input("name", sql.NVarChar, data.name);
      }
      if (data.description !== undefined) {
        fields.push("description = @description");
        request.input("description", sql.NVarChar, data.description);
      }
      fields.push("updated_at = GETDATE()");

      if (fields.length === 1) {
        throw new Error("No fields to update");
      }

      request.input("id", sql.Int, id);
      const query = `
        UPDATE templates
        SET ${fields.join(", ")}
        OUTPUT INSERTED.*
        WHERE id = @id
      `;

      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error(`Error updating template with id ${id}: ${error}`);
    }
  }

  // Delete item
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM templates WHERE id = @id");
      return (result.rowsAffected[0] ?? 0) > 0;
    } catch (error) {
      throw new Error(`Error deleting template with id ${id}: ${error}`);
    }
  }
}
