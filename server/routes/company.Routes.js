import express from "express";
import {
  allData,
  addOpportunity,
  hireTalent,
} from "../controller/company.controller.js";
import { uploadFile } from "../middleware/cloudinary.js";
import { multerUploader } from "../middleware/multer.js";

const companyRouter = express.Router();

// Route to fetch all data (opportunities + talent profiles)
companyRouter.get("/allData", allData);

// Route to create a new talent profile (Hire Talent)
companyRouter.post(
  "/hireTalent",
  multerUploader.fields([
    { name: "resume", maxCount: 1 },
    { name: "profile_Img", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) return res.status(400).send("No file uploaded");

      const uploadResults = {};

      if (req.files["resume"]) {
        const resumeFile = req.files["resume"][0];
        const resumeUploadResult = await uploadFile(resumeFile.path);
        uploadResults.resumeUrl = resumeUploadResult.secure_url;
      }

      if (req.files["profile_Img"]) {
        const profileImgFile = req.files["profile_Img"][0];
        const profileImgUploadResult = await uploadFile(profileImgFile.path);
        uploadResults.profileImgUrl = profileImgUploadResult.secure_url;
      }

      const savedProfile = await hireTalent({
        ...req.body,
        resume: uploadResults.resumeUrl,
        profile_Img: uploadResults.profileImgUrl,
      });

      res.status(201).json({
        success: true,
        msg: "Talent Profile Created Successfully",
        savedProfile,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create talent profile");
    }
  }
);

// Route to create a new job opportunity (Add Opportunity)
companyRouter.post(
  "/addOpportunity",
  multerUploader.fields([
    { name: "documents", maxCount: 1 },
    { name: "cover_Img", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) return res.status(400).send("No file uploaded");

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

      const savedOpportunity = await addOpportunity({
        ...req.body,
        documents: uploadResults.documentUrl,
        cover_Img: uploadResults.coverImgUrl,
      });

      res.status(201).json({
        success: true,
        msg: "Opportunity Created Successfully",
        savedOpportunity,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create opportunity");
    }
  }
);

export default companyRouter;
