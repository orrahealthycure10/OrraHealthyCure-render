import express from 'express';
import dotenv from "dotenv";
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import contactRoute from './routes/contactRoute.js';
import guestOrder from './routes/guestOrderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// API Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1", guestOrder);

// -------------------------
// Serve Frontend (React build)
// -------------------------
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React Router fallback — must be after static, after API, before errors
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Error handler LAST
app.use(errorHandleMiddleware);

// Config only in dev
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

export default app;
