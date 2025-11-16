import express from "express";
import multer from "multer";
import {
  addSeed,
  getAllSeeds,
  getSeedById,
  updateSeed,
  deleteSeed,
} from "../controllers/Seed.controller.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("seedImage"), addSeed);       // Create seed
router.get("/all", getAllSeeds);                                // Get all seeds
router.get("/:id", getSeedById);                                // Get single seed by ID
router.put("/update/:id", upload.single("seedImage"), updateSeed); // Update seed
router.delete("/delete/:id", deleteSeed);                       // Delete seed

export default router;
