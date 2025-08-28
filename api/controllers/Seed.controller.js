import Seed from "../models/seed.model.js";
import { handleError } from "../helpers/handleError.js";

// Add a seed
export const addSeed = async (req, res, next) => {
  try {
    const { type, name, description, price, unit, category, tag } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Seed image is required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newSeed = new Seed({
      type,
      name,
      description,
      price,
      unit,
      category,
      tag,
      image: imagePath,
    });

    await newSeed.save();
    res.status(200).json({ message: "Seed added successfully", seed: newSeed });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get all seeds
export const getAllSeeds = async (req, res, next) => {
  try {
    const seeds = await Seed.find().sort({ createdAt: -1 });
    res.status(200).json({ seeds });
  } catch (error) {
    console.error("❌ getAllSeeds error:", error); // 👈 log the real issue
    res.status(500).json({ message: error.message });
  }
};


// Get a single seed by ID
export const getSeedById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const seed = await Seed.findById(id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json(seed);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Update a seed by ID
export const updateSeed = async (req, res, next) => {
  try {
    const { id } = req.params;

    let imagePath;
    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedSeed = await Seed.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(imagePath && { image: imagePath }), // only update image if provided
      },
      { new: true }
    );

    if (!updatedSeed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json({ message: "Seed updated successfully", seed: updatedSeed });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Delete a seed by ID
export const deleteSeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const seed = await Seed.findByIdAndDelete(id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json({ message: "Seed deleted successfully" });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
