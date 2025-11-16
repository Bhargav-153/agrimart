import Farmer from "../models/farmer.model.js";

// ✅ Register farmer
export const registerFarmer = async (req, res) => {
  try {
    const { fullName, phone, email, address, city, state, pincode } = req.body;

    if (!fullName || !phone || !email || !address || !city || !state || !pincode) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: "Farmer already registered" });
    }

    const farmer = new Farmer({
      fullName,
      phone,
      email,
      address,
      city,
      state,
      pincode
    });

    await farmer.save();

    res.status(201).json({ message: "Farmer registered successfully", farmer });
  } catch (error) {
    console.error("Farmer registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Check if farmer exists
export const checkFarmer = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ exists: false, message: "Email is required" });
    }

    const farmer = await Farmer.findOne({ email });
    res.json({ exists: !!farmer });
  } catch (error) {
    console.error("Error checking farmer:", error);
    res.status(500).json({ exists: false, message: "Server error" });
  }
};
