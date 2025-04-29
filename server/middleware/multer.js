// server/middleware/multer.js
import multer from "multer";

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Configure file filter to accept only images
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer with file size limits and file filter
const multerUploader = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
}).single("avatar");

export default multerUploader;
