import Seed from "../models/seed.model.js";
import { handleError } from "../helpers/handleError.js";

// Add Seed
export const addSeed = async (req, res, next) => {
  try {
    const { image, ...data } = req.body;

    if (!image) return res.status(400).json({ message: "Seed image is required" });

    const seed = new Seed({ ...data, image });
    await seed.save();

    res.status(200).json({ message: "Seed added successfully", seed });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

// Update Seed
export const updateSeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, ...rest } = req.body;

    const seed = await Seed.findByIdAndUpdate(
      id,
      { ...rest, ...(image && { image }) },
      { new: true }
    );

    if (!seed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json({ message: "Seed updated successfully", seed });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

// Get all seeds
export const getAllSeeds = async (req, res, next) => {
  try {
    const seeds = await Seed.find().sort({ createdAt: -1 });
    res.status(200).json({ seeds });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

// Get seed by ID
export const getSeedById = async (req, res, next) => {
  try {
    const seed = await Seed.findById(req.params.id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json(seed);
  } catch (err) {
    next(handleError(500, err.message));
  }
};

// Delete seed
export const deleteSeed = async (req, res, next) => {
  try {
    const seed = await Seed.findByIdAndDelete(req.params.id);
    if (!seed) return res.status(404).json({ message: "Seed not found" });

    res.status(200).json({ message: "Seed deleted successfully" });
  } catch (err) {
    next(handleError(500, err.message));
  }
};
