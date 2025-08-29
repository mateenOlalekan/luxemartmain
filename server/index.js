import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/configDb.js";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// connect DB
await connectDB(process.env.MONGO_URI);

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// error handling
app.use(notFound);
app.use(errorHandler);

// start
const PORT = process.env.PORT || 6880;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
