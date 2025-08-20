import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure uploads folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // e.g. .jpg, .png
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

function fileFilter (req, file, cb) {
  const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'];
  if (!allowedFiles.includes(file.mimetype)) {
    cb(new Error('Only images are allowed'), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
