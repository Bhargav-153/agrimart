import express from "express";
import {
  addNursery,
  deleteNursery,
  getAllNursery,
  showNursery,
  updateNursery,
} from "../controllers/NurseryDetails.controller.js";

const NurseryRoute = express.Router();

NurseryRoute.post("/add", addNursery);
NurseryRoute.put("/update/:nurseryid", updateNursery);
NurseryRoute.get("/show/:nurseryid", showNursery);
NurseryRoute.delete("/delete/:nurseryid", deleteNursery);
NurseryRoute.get("/all-nursery", getAllNursery);

export default NurseryRoute;
