import express from "express";
import { registerFarmer, checkFarmer } from "../controllers/Farmer.controller.js";

const router = express.Router();

router.post("/register", registerFarmer);
router.get("/check", checkFarmer);

export default router;
