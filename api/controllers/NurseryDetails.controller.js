import { handleError } from "../helpers/handleError.js"
import Nursery from "../models/nursery.model.js";

export const addNursery = async (req, res) => {
  try {
    const { plantName, plantPrice, nurseryName, address, phone } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Plant image is required" });
    }

    // Save relative path or full URL to DB
    const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;



    const newNursery = new Nursery({
      plantName,
      plantPrice,
      nurseryName,
      address,
      phone,
      plantImage: imagePath,
    });

    await newNursery.save();
    res.status(200).json({ message: "Nursery added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params;

    const nursery = await Nursery.findById(nurseryid);
    if (!nursery) {
      return next(handleError(404, "Nursery not found"));
    }

    res.status(200).json(nursery);
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const editNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params
    const nursery = await Nursery.findById(nurseryid).populate('plantName', 'name')
    if (!nursery) {
      next(handleError(404, 'Data not found.'))
    }
    res.status(200).json({
      nursery
    })
  } catch (error) {
    next(handleError(500, error.message))
  }
}

export const updateNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params;
    const data = JSON.parse(req.body.data);

    const nursery = await Nursery.findById(nurseryid);
    if (!nursery) return next(handleError(404, "Nursery not found"));

    nursery.plantName = data.plantName;
    nursery.plantPrice = data.plantPrice;
    nursery.nurseryName = data.nurseryName;
    nursery.address = data.address;
    nursery.phone = data.phone;

    if (req.file) {
      const imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      nursery.plantImage = imagePath;
    }

    await nursery.save();

    res.status(200).json({ success: true, message: "Nursery updated successfully." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};




export const deleteNursery = async (req, res, next) => {
  try {
    const { nurseryid } = req.params
    await Nursery.findByIdAndDelete(nurseryid)
    res.status(200).json({
      success: true,
      message: 'Nursery Deleted successfully',

    })

  } catch (error) {
    next(handleError(500, error.message))

  }
}

export const getAllNursery = async(req,res,next) =>{
    try {
        const nursery = await Nursery.find().populate('plantName', 'name').populate('nurseryName', 'name').sort({created_at: -1}).lean().exec()
        res.status(200).json({
          nursery
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}