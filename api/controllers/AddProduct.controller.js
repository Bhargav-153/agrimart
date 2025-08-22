// controllers/AddProduct.controller.js

import FarmerProduct from "../models/farmProduct.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      price,
      contact,
      description,
      quantity,
      unit,
    } = req.body;

    const productImage = req.file?.filename;

    if (!productImage) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const newProduct = new FarmerProduct({
      productName,
      category,
      price,
      contact,
      description,
      quantity,
      unit,
      productImage: `/uploads/${productImage}`,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
