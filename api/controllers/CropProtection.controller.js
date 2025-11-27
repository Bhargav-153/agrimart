import CropProtection from "../models/cropprotection.model.js";
import { handleError } from "../helpers/handleError.js";

// Add Crop Protection
export const addCropProtection = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews, image } = req.body;

    if (!image) return res.status(400).json({ message: "Product image is required" });

    const newProduct = new CropProtection({
      name,
      description,
      price,
      category,
      tag,
      rating,
      reviews,
      image, // store base64 string
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get All
export const getAllCropProtection = async (req, res, next) => {
  try {
    const products = await CropProtection.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
export const getCropProtectionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await CropProtection.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Update
export const updateCropProtection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await CropProtection.findByIdAndUpdate(
      id,
      { ...req.body }, // image will come in req.body if updated
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Delete
export const deleteCropProtection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await CropProtection.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
