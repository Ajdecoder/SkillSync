// server/middleware/multer.js
import multer from "multer";

export const multerUploader = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
