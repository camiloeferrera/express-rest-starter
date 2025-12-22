import sql from "mssql";
import config from "@config/env.js";

const dbSettings: sql.config = {
  server: config.DB_SERVER!,
  database: config.DB_NAME!,
  user: config.DB_USER!,
  password: config.DB_PASSWORD!,
  options: {
    encrypt: config.DB_ENCRYPT ?? false,
    trustServerCertificate: config.DB_TRUST_CERT ?? true,
  },
};

let pool: sql.ConnectionPool | undefined;

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(dbSettings).connect();
      console.log("✅ Connected to the database");
    }
    if (!pool) {
      throw new Error("Failed to create database connection pool");
    }
    return pool;
  } catch (error) {
    throw error;
  }
}

export { sql };
