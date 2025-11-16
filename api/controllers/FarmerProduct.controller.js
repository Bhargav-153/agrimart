import FarmerProduct from "../models/farmerProduct.model.js";

// ✅ Add product
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

    if (!req.file) {
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
      image: `/uploads/${req.file.filename}`, // ✅ matches schema
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await FarmerProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await FarmerProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
