// routes/FarmProduct.route.js

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { addProduct } from "../controllers/AddProduct.controller.js";

const router = express.Router();

// resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/products", upload.single("image"), addProduct);

export default router;
