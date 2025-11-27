import express from "express";
import {
  addEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/Equipment.controller.js";

const router = express.Router();



// ✅ Add
router.post("/add", addEquipment);

// ✅ Get all
router.get("/all", getAllEquipment);

// ✅ Get single
router.get("/:id", getEquipmentById);

// ✅ Update
router.put("/update/:id",updateEquipment);

// ✅ Delete
router.delete("/delete/:id", deleteEquipment);

export default router;
