import Equipment from "../models/equipment.model.js";
import { handleError } from "../helpers/handleError.js";

// ✅ Add Equipment (without image upload)
export const addEquipment = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews, image } = req.body;
    
    if (!image) return res.status(400).json({ message: "Product image is required" });

    const newEquipment = new Equipment({
      name,
      description,
      price,
      category,
      tag,
      rating,
      reviews,
      image,
    });

    await newEquipment.save();
    res.status(200).json({ message: "Equipment added successfully", equipment: newEquipment });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


// ✅ Get All Equipment
export const getAllEquipment = async (req, res, next) => {
  try {
    const equipments = await Equipment.find().sort({ createdAt: -1 });
    res.status(200).json({ equipments });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Get Single Equipment by ID
export const getEquipmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findById(id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    res.status(200).json(equipment);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Update Equipment (without image upload)
export const updateEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedEquipment) return res.status(404).json({ message: "Equipment not found" });

    res.status(200).json({ message: "Equipment updated successfully", equipment: updatedEquipment });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ✅ Delete Equipment
export const deleteEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByIdAndDelete(id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
