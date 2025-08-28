import CropNutrition from "../models/cropNutrition.model.js";
import { handleError } from "../helpers/handleError.js";

// ✅ Add Crop Nutrition Product
export const addCropNutrition = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newProduct = new CropNutrition({
      name,
      description,
      price,
      category,
      tag,
      rating,
      reviews,
      image: imagePath,
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Get All Crop Nutrition Products
export const getAllCropNutrition = async (req, res, next) => {
  try {
    const products = await CropNutrition.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Crop Nutrition Product by ID
export const getCropNutritionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await CropNutrition.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Update Crop Nutrition Product
export const updateCropNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    let imagePath;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await CropNutrition.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(imagePath && { image: imagePath }),
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Delete Crop Nutrition Product
export const deleteCropNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await CropNutrition.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
