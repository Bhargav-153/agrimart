import Schemes from "../models/Scheme.model.js";

// Add a new scheme
export const addSchema = async (req, res) => {
  try {
    const { title, description, details, icon, linkApply, linkYoutube } =
      req.body;
    if (!title || !description || !details || !linkApply || !linkYoutube) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newScheme = new Schemes({
      title,
      description,
      details,
      icon,
      linkApply,
      linkYoutube,
    });
    await newScheme.save();
    res
      .status(201)
      .json({ message: "Scheme added successfully", scheme: newScheme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schemes
export const getAllSchemas = async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json({ schemes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single scheme by ID
export const showSchema = async (req, res) => {
  try {
    const scheme = await Schemes.findById(req.params.schemeid);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a scheme by ID
export const updateSchema = async (req, res) => {
  try {
    const updated = await Schemes.findByIdAndUpdate(
      req.params.schemeid,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Scheme not found" });
    res.json({ message: "Scheme updated", scheme: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a scheme by ID
export const deleteSchema = async (req, res) => {
  try {
    const deleted = await Schemes.findByIdAndDelete(req.params.schemeid);
    if (!deleted) return res.status(404).json({ message: "Scheme not found" });
    res.json({ message: "Scheme deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
