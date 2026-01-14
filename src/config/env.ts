dotenv.config();
import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 443;
const DB_SERVER = requireEnv("DB_SERVER");
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const DB_NAME = requireEnv("DB_NAME");
const DB_USER = requireEnv("DB_USER");
const DB_PASSWORD = requireEnv("DB_PASSWORD");

const JWT_SECRET = requireEnv("JWT_SECRET");

export default {
  PORT,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  JWT_SECRET,
};
