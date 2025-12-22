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
const DB_NAME = requireEnv("DB_NAME");
const DB_USER = requireEnv("DB_USER");
const DB_PASSWORD = requireEnv("DB_PASSWORD");
const DB_ENCRYPT = process.env.DB_ENCRYPT === "true";
const DB_TRUST_CERT = process.env.DB_TRUST_CERT === "true";
const JWT_SECRET = requireEnv("JWT_SECRET");

export default {
  PORT,
  DB_SERVER,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_ENCRYPT,
  DB_TRUST_CERT,
  JWT_SECRET,
};
