import express from "express";
import {
  addSeed,
  getAllSeeds,
  getSeedById,
  updateSeed,
  deleteSeed,
} from "../controllers/Seed.controller.js";

const router = express.Router();



// Routes
router.post("/add", addSeed);       // Create seed
router.get("/all", getAllSeeds);                                // Get all seeds
router.get("/:id", getSeedById);                                // Get single seed by ID
router.put("/update/:id",updateSeed); // Update seed
router.delete("/delete/:id", deleteSeed);                       // Delete seed

export default router;
