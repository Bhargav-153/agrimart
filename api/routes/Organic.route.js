import express from "express";
import {
  addOrganic,
  getAllOrganics,
  updateOrganic,
  deleteOrganic,
  getOrganicById,
} from "../controllers/Organic.controller.js";

const router = express.Router();



// ✅ Routes
router.post("/add", addOrganic);
router.get("/all", getAllOrganics);
router.put("/update/:id", updateOrganic);
router.delete("/delete/:id", deleteOrganic);
router.get("/:id", getOrganicById);


export default router;
