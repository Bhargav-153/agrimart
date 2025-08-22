import FarmerProduct from "../models/farmerProduct.model.js";
import Farmer from "../models/farmer.model.js";

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
      farmerEmail,
    } = req.body;

    const farmer = await Farmer.findOne({ email: farmerEmail });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new FarmerProduct({
      productName,
      category,
      price,
      contact,
      description,
      quantity,
      unit,
      image: imageUrl,
      farmerEmail,
      farmer: {
        name: farmer.fullName,
        location: `${farmer.city}, ${farmer.state}`,
      },
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await FarmerProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await FarmerProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
