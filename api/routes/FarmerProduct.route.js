import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../controllers/FarmerProduct.controller.js";

const router = express.Router();


// ✅ Routes
router.post("/products",addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProduct);

export default router;
