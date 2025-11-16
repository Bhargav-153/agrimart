import express from "express";
import multer from "multer";
import {
  addCropNutrition,
  getAllCropNutrition,
  getCropNutritionById,
  updateCropNutrition,
  deleteCropNutrition,
} from "../controllers/CropNutrition.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Add a new crop nutrition product (with image upload)
router.post("/add", upload.single("image"), addCropNutrition);

// ✅ Get all products
router.get("/all", getAllCropNutrition);

// ✅ Get a single product by ID
router.get("/:id", getCropNutritionById);

// ✅ Update product (with optional new image)
router.put("/update/:id", upload.single("image"), updateCropNutrition);

// ✅ Delete product
router.delete("/delete/:id", deleteCropNutrition);

export default router;
