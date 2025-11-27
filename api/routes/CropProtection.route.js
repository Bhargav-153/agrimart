import express from "express";
import {
  addCropProtection,
  getAllCropProtection,
  getCropProtectionById,
  updateCropProtection,
  deleteCropProtection,
} from "../controllers/CropProtection.controller.js";

const router = express.Router();



// ✅ Add a new crop protection product (with image upload)
router.post("/add",addCropProtection);

// ✅ Get all products
router.get("/all", getAllCropProtection);

// ✅ Get a single product by ID
router.get("/:id", getCropProtectionById);

// ✅ Update product (with optional new image)
router.put("/update/:id", updateCropProtection);

// ✅ Delete product
router.delete("/delete/:id", deleteCropProtection);

export default router;
