import FarmerProduct from "../models/farmerProduct.model.js";

// ✅ Add product (base64 image)
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
      image, // base64 string
    } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = new FarmerProduct({
      productName,
      category,
      price,
      contact,
      description,
      quantity,
      unit,
      image, // store base64 directly
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

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await FarmerProduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
