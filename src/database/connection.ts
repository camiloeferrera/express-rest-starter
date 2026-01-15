import sql from "mssql";
import config from "@config/env.js";

const dbConfig = {
  server: config.DB_SERVER,
  port: config.DB_PORT,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  options: {
    encrypt: false, // Set to true for Azure SQL Database
    trustServerCertificate: true, // For local development
  },
};

let pool: sql.ConnectionPool | undefined;

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (!pool) {
      pool = new sql.ConnectionPool(dbConfig);
      await pool.connect();

      // Test the connection
      const result = await pool
        .request()
        .query("SELECT GETDATE() AS currentTime");
      console.log(
        "✅ Connected to SQL Server: ",
        result.recordset[0].currentTime
      );
    }
    if (!pool) {
      throw new Error("❌ Failed to create database connection pool.");
    }
    return pool;
  } catch (error) {
    throw error;
  }
}

export { sql };
