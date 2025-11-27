import express from "express";
import {
  addCropNutrition,
  getAllCropNutrition,
  getCropNutritionById,
  updateCropNutrition,
  deleteCropNutrition,
} from "../controllers/CropNutrition.controller.js";

const router = express.Router();



// ✅ Add a new crop nutrition product (with image upload)
router.post("/add", addCropNutrition);

// ✅ Get all products
router.get("/all", getAllCropNutrition);

// ✅ Get a single product by ID
router.get("/:id", getCropNutritionById);

// ✅ Update product (with optional new image)
router.put("/update/:id", updateCropNutrition);

// ✅ Delete product
router.delete("/delete/:id", deleteCropNutrition);

export default router;
