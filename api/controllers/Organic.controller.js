import Organic from "../models/Organic.model.js";

// ✅ Create

export const addOrganic = async (req, res, next) => {
  try {
    const { name, description, price, tag, rating, reviews } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: "Name, description & price are required" });
    }

    const imagePath = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const organic = new Organic({
      name,
      description,
      price: Number(price),
      tag,
      rating: rating ? Number(rating) : 0,
      reviews: reviews ? Number(reviews) : 0,
      image: imagePath,
    });

    await organic.save();
    res.status(201).json({ success: true, organic });
  } catch (err) {
    next(err);
  }
};


// ✅ Get all
export const getAllOrganics = async (req, res, next) => {
  try {
    const organics = await Organic.find().sort({ createdAt: -1 });
    res.json({ success: true, organics });
  } catch (err) {
    next(err);
  }
};

// ✅ Get by id
export const getOrganicById = async (req, res, next) => {
  try {
    const organic = await Organic.findById(req.params.id);
    if (!organic) return res.status(404).json({ message: "Organic product not found" });
    res.json({ success: true, organic });
  } catch (err) {
    next(err);
  }
};

// ✅ Update
export const updateOrganic = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.price) updates.price = Number(updates.price);
    if (updates.rating) updates.rating = Number(updates.rating);
    if (updates.reviews) updates.reviews = Number(updates.reviews);
    if (req.file) updates.image = `/uploads/${req.file.filename}`;

    const organic = await Organic.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!organic) return res.status(404).json({ message: "Organic product not found" });
    res.json({ success: true, organic });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete
export const deleteOrganic = async (req, res, next) => {
  try {
    const organic = await Organic.findByIdAndDelete(req.params.id);
    if (!organic) return res.status(404).json({ message: "Organic product not found" });
    res.json({ success: true, message: "Organic product deleted" });
  } catch (err) {
    next(err);
  }
};
