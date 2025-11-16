import express from "express";
import multer from "multer";
import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controllers/FarmerProduct.controller.js";

const router = express.Router();

// ✅ Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure /uploads exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/products", upload.single("image"), addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

export default router;
