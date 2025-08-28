import express from "express";
import multer from "multer";
import {
  addOrganic,
  getAllOrganics,
  getOrganicById,
  updateOrganic,
  deleteOrganic,
} from "../controllers/Organic.controller.js";

const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Routes
router.post("/add", upload.single("image"), addOrganic);
router.get("/all", getAllOrganics);
router.get("/:id", getOrganicById);
router.put("/update/:id", upload.single("image"), updateOrganic);
router.delete("/delete/:id", deleteOrganic);

export default router;
