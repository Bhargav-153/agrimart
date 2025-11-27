import Organic from "../models/organic.model.js";
import { handleError } from "../helpers/handleError.js";

// Add Organic product
export const addOrganic = async (req, res, next) => {
  try {
    const { name, description, price, unit, tag, rating, reviews, image } = req.body;

if (!image) {
  return res.status(400).json({ message: "Organic image is required" });
}

const newOrganic = new Organic({
  name,
  description,
  price,
  unit,
  tag,
  rating,
  reviews,
  image, // base64 string stored directly in MongoDB
});

await newOrganic.save();
res.status(200).json({ message: "Organic product added", organic: newOrganic });

  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Update Organic
export const updateOrganic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, ...rest } = req.body;

    const updatedOrganic = await Organic.findByIdAndUpdate(
      id,
      { ...rest, ...(image && { image }) },
      { new: true }
    );

    if (!updatedOrganic) return res.status(404).json({ message: "Organic not found" });

    res.status(200).json({ message: "Organic updated", organic: updatedOrganic });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Get single organic product
export const getOrganicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organic = await Organic.findById(id);

    if (!organic) {
      return res.status(404).json({ message: "Organic not found" });
    }

    res.status(200).json({ organic });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


// Get all organics
export const getAllOrganics = async (req, res, next) => {
  try {
    const organics = await Organic.find().sort({ createdAt: -1 });
    res.status(200).json({ organics });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Delete Organic
export const deleteOrganic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organic = await Organic.findByIdAndDelete(id);
    if (!organic) return res.status(404).json({ message: "Organic not found" });

    res.status(200).json({ message: "Organic deleted" });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
