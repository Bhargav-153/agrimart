import CropNutrition from "../models/cropNutrition.model.js";
import { handleError } from "../helpers/handleError.js";

// ✅ Add Crop Nutrition Product without Multer
export const addCropNutrition = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const newProduct = new CropNutrition({
      name,
      description,
      price,
      category,
      tag,
      rating,
      reviews,
      image, // Base64 string or URL
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Update Product
export const updateCropNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await CropNutrition.findByIdAndUpdate(
      id,
      req.body, // contains image if updated
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
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
