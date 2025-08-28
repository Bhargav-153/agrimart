import Equipment from "../models/equipment.model.js";
import { handleError } from "../helpers/handleError.js";

// ✅ Add Equipment
export const addEquipment = async (req, res, next) => {
  try {
    const { name, description, price, category, tag, rating, reviews } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Equipment image is required" });
    }

    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newEquipment = new Equipment({
      name,
      description,
      price,
      category,
      tag,
      rating,
      reviews,
      image: imagePath,
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
    res.status(500).json({ message: error.message });
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

// ✅ Update Equipment
export const updateEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    let imagePath;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(imagePath && { image: imagePath }),
      },
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
