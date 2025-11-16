import express from "express";
import multer from "multer";
import {
  addEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/Equipment.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Add
router.post("/add", upload.single("image"), addEquipment);

// ✅ Get all
router.get("/all", getAllEquipment);

// ✅ Get single
router.get("/:id", getEquipmentById);

// ✅ Update
router.put("/update/:id", upload.single("image"), updateEquipment);

// ✅ Delete
router.delete("/delete/:id", deleteEquipment);

export default router;
