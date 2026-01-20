import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import templateRouter from "./routes/template.route.js";
import type { Express } from "express";

const app: Express = express();

// Neccesary if behind a proxy (e.g. Heroku, AWS ELB, Nginx, Cloudflare)
app.set("trust proxy", 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Security middleware
app.use(helmet());
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/templates", templateRouter);

export default app;
