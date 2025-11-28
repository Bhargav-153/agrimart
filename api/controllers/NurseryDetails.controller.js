import { handleError } from "../helpers/handleError.js";
import Nursery from "../models/nursery.model.js";

// Add Nursery (base64)
export const addNursery = async (req, res) => {
  try {
    const { plantName, plantPrice, nurseryName, address, phone, plantImage } =
      req.body;

    if (!plantImage) {
      return res.status(400).json({ message: "Plant image is required" });
    }

    const newNursery = new Nursery({
      plantName,
      plantPrice,
      nurseryName,
      address,
      phone,
      plantImage, // base64
    });

    await newNursery.save();

    res.status(200).json({ message: "Nursery added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show Nursery
export const showNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params;

    const nursery = await Nursery.findById(nurseryid);
    if (!nursery) return next(handleError(404, "Nursery not found"));

    res.status(200).json(nursery);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Update Nursery
export const updateNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params;
    const data = req.body; // FIXED

    const nursery = await Nursery.findById(nurseryid);
    if (!nursery) return next(handleError(404, "Nursery not found"));

    // Update fields
    nursery.plantName = data.plantName;
    nursery.plantPrice = data.plantPrice;
    nursery.nurseryName = data.nurseryName;
    nursery.address = data.address;
    nursery.phone = data.phone;

    // Update image if uploaded
    if (data.plantImage) {
      nursery.plantImage = data.plantImage;
    }

    await nursery.save();

    res.status(200).json({
      success: true,
      message: "Nursery updated successfully",
    });
  } catch (error) {
    console.error(error); // see the actual error
    next(handleError(500, error.message));
  }
};


// Delete Nursery
export const deleteNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params;
    await Nursery.findByIdAndDelete(nurseryid);

    res.status(200).json({
      success: true,
      message: "Nursery deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// All Nursery
export const getAllNursery = async (req, res, next) => {
  try {
    const nursery = await Nursery.find().sort({ created_at: -1 }).lean();

    res.status(200).json({ nursery });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
