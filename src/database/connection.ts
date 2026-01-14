import { Pool } from "pg";
import config from "@config/env.js";

const dbSettings = {
  host: config.DB_SERVER,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  ssl: false, // or true if needed
};

let pool: Pool | undefined;

export async function getConnection(): Promise<Pool> {
  try {
    if (!pool) {
      pool = new Pool(dbSettings);

      // Test the connection
      const result = await pool.query("SELECT NOW() AS current_time");
      console.log(
        "✅ Connected to the database: ",
        result.rows[0].current_time
      );
    }
    if (!pool) {
      throw new Error("Failed to create database connection pool");
    }
    return pool;
  } catch (error) {
    throw error;
  }
}

export { Pool as sql };
