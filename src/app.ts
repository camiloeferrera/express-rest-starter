import express from "express";
import cors from "cors";
import helmet from "helmet";
import type { Express } from "express";

const app: Express = express();

// Neccesary if behind a proxy (e.g. Heroku, AWS ELB, Nginx, Cloudflare)
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

app.use(cors());
app.use(express.json());

export default app;
