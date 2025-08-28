import express from "express";
import multer from "multer";
import {
  addCropProtection,
  getAllCropProtection,
  getCropProtectionById,
  updateCropProtection,
  deleteCropProtection,
} from "../controllers/CropProtection.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Add a new crop protection product (with image upload)
router.post("/add", upload.single("image"), addCropProtection);

// ✅ Get all products
router.get("/all", getAllCropProtection);

// ✅ Get a single product by ID
router.get("/:id", getCropProtectionById);

// ✅ Update product (with optional new image)
router.put("/update/:id", upload.single("image"), updateCropProtection);

// ✅ Delete product
router.delete("/delete/:id", deleteCropProtection);

export default router;
