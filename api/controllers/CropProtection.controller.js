import CropProtection from "../models/cropprotection.model.js";
import { handleError } from "../helpers/handleError.js";

// ✅ Add Crop Protection Product
export const addCropProtection = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newProduct = new CropProtection({
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

// ✅ Get All Crop Protection Products
export const getAllCropProtection = async (req, res, next) => {
  try {
    const products = await CropProtection.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Product by ID
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

// ✅ Update Product
export const updateCropProtection = async (req, res, next) => {
  try {
    const { id } = req.params;
    let imagePath;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await CropProtection.findByIdAndUpdate(
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

// ✅ Delete Product
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
