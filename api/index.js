import "./loadEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import NurseryRoute from "./routes/Nursery.route.js";

import FarmerRoute from "./routes/Farmer.route.js";
import farmerProductRoutes from "./routes/FarmerProduct.route.js";
import seedRoutes from "./routes/Seed.route.js";
import cropProtectionRoutes from "./routes/CropProtection.route.js";
import cropNutritionRoutes from "./routes/CropNutrition.route.js";
import equipmentRoutes from "./routes/Equipment.route.js";

import organicRoutes from "./routes/Organic.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import SchemaRoute from "./routes/Schema.route.js";
import notificationRoutes from "./routes/notification.route.js";
import faqRoutes from "./routes/faq.route.js";
import supportRoutes from "./routes/support.route.js";
import paymentRoute from "./routes/Razorpay.route.js";

const PORT = process.env.PORT || 3000;
const app = express();

const dir = "./uploads";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);


app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use(cookieParser());


app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/nursery", NurseryRoute);
app.use("/api/schemes", SchemaRoute);
app.use("/api/farmers", FarmerRoute);
app.use("/api/farmerProducts", farmerProductRoutes);
app.use("/api/seeds", seedRoutes);
app.use("/api/crop-protection", cropProtectionRoutes);
app.use("/api/crop-nutrition", cropNutritionRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/organic", organicRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/payment", paymentRoute);


mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "agrimart" })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection failed", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
