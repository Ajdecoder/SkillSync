import express from "express";
import {
  allRequirements,
  getRequirement,
  postRequirement,
} from "../controller/company.controller.js";
import { uploadFile } from "../middleware/cloudinary.js";
import { multerUploader } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.get("/allRequirements", allRequirements);

companyRouter.post(
  "/getRequirement",
  multerUploader.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  getRequirement,
  async (req, res) => {
    try {
      if (!req.files) return "no file to upload";

      const uploadResults = {};

      if (req.files["documents"]) {
        const documentFile = req.files["documents"][0];
        const documentUploadResult = await uploadFile(documentFile.path);
        uploadResults.documentUrl = documentUploadResult.secure_url;
      }

      if (req.files["cover_Img"]) {
        const coverImgFile = req.files["cover_Img"][0];
        const coverImgUploadResult = await uploadFile(coverImgFile.path);
        uploadResults.coverImgUrl = coverImgUploadResult.secure_url;
      }

      res.send({
        success: true,
        msg: "File Uploaded Successfully",
        img_url: uploadResults.coverImgUrl,
        doc_url: uploadResults.documentUrl,
        savedRequirement
      });
    } catch (err) {
      console.error(err);
    }
  }
);
companyRouter.post(
  "/postRequirement",
  multerUploader.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  postRequirement,
  async (req, res) => {
    try {
      if (!req.files) return "no file to upload";

      const uploadResults = {};

      if (req.files["documents"]) {
        const documentFile = req.files["documents"][0];
        const documentUploadResult = await uploadFile(documentFile.path);
        uploadResults.documentUrl = documentUploadResult.secure_url;
      }

      if (req.files["cover_Img"]) {
        const coverImgFile = req.files["cover_Img"][0];
        const coverImgUploadResult = await uploadFile(coverImgFile.path);
        uploadResults.coverImgUrl = coverImgUploadResult.secure_url;
      }
      res.send({
        success: true,
        msg: "File Uploaded Successfully",
        img_url: uploadResults.coverImgUrl,
        doc_url: uploadResults.documentUrl,
        savedRequirement
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export default companyRouter;
