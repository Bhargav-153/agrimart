import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
} from "../controllers/FarmerProduct.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/products", upload.single("image"), addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

export default router;
