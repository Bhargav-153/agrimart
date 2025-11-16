import express from "express";
import {
  addNursery,
  deleteNursery,
  getAllNursery,
  showNursery,
  updateNursery,
} from "../controllers/NurseryDetails.controller.js";

import upload from "../config/multer.js"; // ✅ Correct path

const NurseryRoute = express.Router();

NurseryRoute.post("/add", upload.single("plantImage"), addNursery);
NurseryRoute.put("/update/:nurseryid",upload.single("plantImage"), updateNursery);
NurseryRoute.get("/show/:nurseryid", showNursery);
NurseryRoute.delete("/delete/:nurseryid", deleteNursery);
NurseryRoute.get("/all-nursery", getAllNursery);

export default NurseryRoute;
