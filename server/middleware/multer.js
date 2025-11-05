import multer from "multer";

// Common memory storage
const storage = multer.memoryStorage();

// 🖼️ Image uploader
export const imageUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("avatar");

// 📄 Resume uploader (for .pdf, .doc, .docx)
export const resumeUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error("Only PDF or DOC files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
}).single("file");
