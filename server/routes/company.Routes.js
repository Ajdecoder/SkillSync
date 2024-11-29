import express from "express";
import { allData, hireTalent } from "../controller/company.controller.js";
// import { multerUploader } from "../middleware/multer.js"; // Disabled multer for now

const companyRouter = express.Router();

// Route to hire talent (without multer)
import { multerUploader } from "../middleware/multer.js"; // Ensure multerUploader is defined
import { uploadFile } from "../middleware/cloudinary.js"; // Cloudinary upload function

companyRouter.post(
  "/hireTalent",
  multerUploader.single("profile_Img"),  // Handle single file upload for 'profile_Img'
  async (req, res) => {
    try {
      // Check if the file is uploaded
      console.log(req.body,'req body in route')
      if (!req.file) return res.status(400).send("No file uploaded");

      // Upload file to Cloudinary
      const profileImgUploadResult = await uploadFile(req.file.path);

      // Create a new hireTalent object with the profile image URL
      const hireData = {
        ...req.body,
        profile_Img: profileImgUploadResult.secure_url,
      };

      // Create talent profile in the database
      const savedProfile = await hireTalent(hireData);

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

companyRouter.get("/allData",allData)


export default companyRouter;
